import { Component, OnInit, Inject } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';

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
  id?: string;
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
  editando: boolean = false;
  docIdEditar?: string;
  imagenUrlActual?: string;
  pdfUrlActual?: string;

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
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
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
    if (!this.nombre || (!this.editando && !this.pdfFile)) {
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

      let imagenUrl = this.imagenUrlActual || '';
      let pdfUrl = this.pdfUrlActual || '';

      // 🔹 Subir imagen (opcional)
      if (this.imagenFile) {

        // 🔥 borrar imagen anterior
        if (this.imagenUrlActual) {
          await this.borrarArchivoPorUrl(this.imagenUrlActual);
        }

        const imagenRef = ref(
          this.storage,
          `imagenes/${Date.now()}_${this.imagenFile.name}`
        );
        await uploadBytes(imagenRef, this.imagenFile);
        imagenUrl = await getDownloadURL(imagenRef);
      }

      // 🔹 Subir PDF
      if (this.pdfFile) {

        // 🔥 borrar PDF anterior
        if (this.pdfUrlActual) {
          await this.borrarArchivoPorUrl(this.pdfUrlActual);
        }

        const pdfRef = ref(
          this.storage,
          `documentos/${Date.now()}_${this.pdfFile.name}`
        );
        await uploadBytes(pdfRef, this.pdfFile);
        pdfUrl = await getDownloadURL(pdfRef);
      }

      // 🔹 Guardar en Firestore
      if (this.editando && this.docIdEditar) {

        await updateDoc(
          doc(this.firestore, 'documentos', this.docIdEditar),
          {
            nombre: this.nombre,
            descripcion: this.descripcion,
            cantidad: this.cantidad,
            imagenUrl,
            pdfUrl
          }
        );

        this.showToast('Documento actualizado ✏️', 'success');

      } else {

        await addDoc(collection(this.firestore, 'documentos'), {
          nombre: this.nombre,
          descripcion: this.descripcion,
          cantidad: this.cantidad,
          imagenUrl,
          pdfUrl,
          fecha: new Date()
        });

        this.showToast('Documento creado ✅', 'success');
      }

      // 🔹 Reset
      this.resetFormulario();
      this.modalOpen = false;

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

  resetFormulario() {
    this.nombre = '';
    this.descripcion = '';
    this.cantidad = 1;

    this.imagenFile = undefined;
    this.pdfFile = undefined;

    this.imagenUrlActual = undefined;
    this.pdfUrlActual = undefined;

    this.editando = false;
    this.docIdEditar = undefined;
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
      id: doc.id,
      ...(doc.data() as Documento)
    }));
  }

  // ==========================
  // 📄 Abrir PDF
  // ==========================
  abrirPdf(url: string) {
    window.open(url, '_blank');
  }

  abrirEditar(docu: Documento) {
    this.editando = true;
    this.docIdEditar = docu.id;

    this.nombre = docu.nombre;
    this.descripcion = docu.descripcion;
    this.cantidad = docu.cantidad;

    this.imagenUrlActual = docu.imagenUrl;
    this.pdfUrlActual = docu.pdfUrl;

    this.modalOpen = true;
  }

  async borrarArchivoPorUrl(url?: string) {
    if (!url) return;

    try {
      const archivoRef = ref(this.storage, url);
      await deleteObject(archivoRef);
    } catch (error) {
      console.warn('No se pudo borrar archivo:', error);
    }
  }

  async eliminarDocumento(docu: Documento) {

    const alert = await this.alertCtrl.create({
      cssClass: 'confirm-alert',

      header: 'Eliminar documento',
      message: '¿Seguro que deseas eliminar este documento?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {

            if (!docu.id) return;

            const loading = await this.loadingCtrl.create({
              message: 'Eliminando documento...',
              spinner: 'crescent',
              backdropDismiss: false
            });

            await loading.present();

            try {

              // 🔥 BORRAR ARCHIVOS DEL STORAGE
              await this.borrarArchivoPorUrl(docu.imagenUrl);
              await this.borrarArchivoPorUrl(docu.pdfUrl);

              await deleteDoc(
                doc(this.firestore, 'documentos', docu.id)
              );

              this.showToast('Documento eliminado 🗑️', 'success');
              await this.cargarDocumentos();

            } catch (error) {
              console.error(error);
              this.showToast('Error al eliminar', 'danger');
            } finally {
              await loading.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
