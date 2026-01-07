import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar-documentos',
  templateUrl: './listar-documentos.page.html',
  styleUrls: ['./listar-documentos.page.scss'],
  standalone: false
})
export class ListarDocumentosPage {

  documentos: any[] = [];
  cargando = true;

  storage = getStorage(initializeApp(environment.firebase));

ionViewWillEnter() {
  this.cargarDocumentos();
}

async cargarDocumentos() {
  this.cargando = true;
  this.documentos = []; // 🔥 limpiar antes de volver a cargar

  try {
    const carpetaRef = ref(this.storage, 'documentos');
    const resultado = await listAll(carpetaRef);

    for (const item of resultado.items) {
      const url = await getDownloadURL(item);

      this.documentos.push({
        nombre: item.name,
        url
      });
    }

  } catch (error) {
    console.error('Error cargando documentos:', error);
  } finally {
    this.cargando = false;
  }
}
}
