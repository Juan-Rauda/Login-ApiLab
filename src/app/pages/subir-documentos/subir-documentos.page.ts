import { Component, OnInit, Inject } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { ToastController } from '@ionic/angular';

// 🔥 Firestore Firebase PURO
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';

// 🔥 Storage Firebase PURO
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface Documento {
  nombre: string;
  descripcion: string;
  imagenUrl?: string;
  cantidad: number;
  pdfUrl: string;
  fecha: any;
}

@Component({
  selector: 'app-subir-documentos',
  templateUrl: './subir-documentos.page.html',
  styleUrls: ['./subir-documentos.page.scss'],
  standalone: false
})
export class SubirDocumentosPage implements OnInit {

  modalOpen: boolean = false;

  // 🔹 Formulario
  nombre: string = '';
  descripcion: string = '';
  cantidad: number = 1;
  cargando: boolean = false;

  imagenFile?: File;
  pdfFile?: File;

  // 🔹 Listado
  documentos: Documento[] = [];

  // 🔹 Storage
  storage = getStorage();

  constructor(
    @Inject('firebaseFirestore') private firestore: Firestore,
    private toastCtrl: ToastController
  ) { }

  async ngOnInit() {
    await this.cargarDocumentos();
  }

  // ==========================
  // 📂 Selección de archivos
  // ==========================
  seleccionarImagen(event: any) {
    this.imagenFile = event.target.files[0];
  }

  seleccionarPdf(event: any) {
    this.pdfFile = event.target.files[0];
  }

  // ==========================
  // ⬆️ Subir documento
  // ==========================
  async subirDocumento() {
    if (!this.nombre || !this.pdfFile) {
      this.showToast(
        'El nombre y el PDF son obligatorios',
        'warning'
      );
      return;
    }

    this.cargando = true;

    try {

      const auth = getAuth();
      const user = auth.currentUser;

      // 🔐 VALIDACIONES DE SEGURIDAD
      if (!user) {
        this.showToast(
          'Debes iniciar sesión para subir documentos',
          'danger'
        );
        return;
      }

      if (!user.emailVerified) {
        this.showToast(
          'Debes verificar tu correo antes de subir documentos',
          'warning'
        );
        return;
      }

      let imagenUrl = '';

      // 🔹 Subir imagen (opcional)
      if (this.imagenFile) {
        const imagenRef = ref(
          this.storage,
          `imagenes/${Date.now()}_${this.imagenFile.name}`
        );
        await uploadBytes(imagenRef, this.imagenFile);
        imagenUrl = await getDownloadURL(imagenRef);
      }

      // 🔹 Subir PDF
      const pdfRef = ref(
        this.storage,
        `documentos/${Date.now()}_${this.pdfFile.name}`
      );
      await uploadBytes(pdfRef, this.pdfFile);
      const pdfUrl = await getDownloadURL(pdfRef);

      // 🔹 Guardar en Firestore
      await addDoc(collection(this.firestore, 'documentos'), {
        nombre: this.nombre,
        descripcion: this.descripcion,
        cantidad: this.cantidad,
        imagenUrl,
        pdfUrl,
        fecha: new Date()
      });

      // 🔹 Reset
      this.nombre = '';
      this.descripcion = '';
      this.cantidad = 1;
      this.imagenFile = undefined;
      this.pdfFile = undefined;
      this.modalOpen = false;

      this.showToast(
        'Documento subido correctamente ✅',
        'success'
      );

      // 🔹 Recargar lista
      await this.cargarDocumentos();

    } catch (error) {
      console.error('Error al subir:', error);
      this.showToast(
        'Error al subir el documento',
        'danger'
      );
    } finally {
      this.cargando = false;
    }
  }

  async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'dark' = 'danger'
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top',
      color,
      cssClass: 'custom-toast outlined-toast',
      buttons: [{ icon: 'close', role: 'cancel' }]
    });

    await toast.present();
  }

  // ==========================
  // 📋 Cargar documentos
  // ==========================
  async cargarDocumentos() {
    const q = query(
      collection(this.firestore, 'documentos'),
      orderBy('nombre', 'asc')
    );

    const snapshot = await getDocs(q);

    this.documentos = snapshot.docs.map(doc => ({
      ...(doc.data() as Documento)
    }));
  }

  // ==========================
  // 📄 Abrir PDF
  // ==========================
  abrirPdf(url: string) {
    window.open(url, '_blank');
  }
}
