import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subir-documentos',
  templateUrl: './subir-documentos.page.html',
  styleUrls: ['./subir-documentos.page.scss'],
  standalone: false
})
export class SubirDocumentosPage {

  progreso = 0;
  subiendo = false;
  mensaje = '';
  archivoSeleccionado: File | null = null;

  storage = getStorage(initializeApp(environment.firebase));

  seleccionarArchivo(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirArchivo() {
    if (!this.archivoSeleccionado) {
      this.mensaje = 'Selecciona un archivo primero';
      return;
    }

    const ruta = `documentos/${Date.now()}_${this.archivoSeleccionado.name}`;
    const storageRef = ref(this.storage, ruta);

    const uploadTask = uploadBytesResumable(storageRef, this.archivoSeleccionado);

    this.subiendo = true;
    this.progreso = 0;
    this.mensaje = 'Subiendo archivo...';

    uploadTask.on(
      'state_changed',
      snapshot => {
        this.progreso = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      error => {
        console.error(error);
        this.mensaje = 'Error al subir el archivo';
        this.subiendo = false;
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        this.mensaje = '✅ Archivo subido correctamente';
        this.subiendo = false;

        console.log('URL del archivo:', url);
      }
    );
  }
}
