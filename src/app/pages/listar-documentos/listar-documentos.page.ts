import { Component, Inject, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore';

interface Documento {
  nombre: string;
  descripcion: string;
  cantidad: number;
  imagenUrl?: string;
  pdfUrl: string;
  fecha: any;
}

@Component({
  selector: 'app-listar-documentos',
  templateUrl: './listar-documentos.page.html',
  styleUrls: ['./listar-documentos.page.scss'],
  standalone: false
})
export class ListarDocumentosPage implements OnInit {

  documentos: Documento[] = [];

  constructor(
    @Inject('firebaseFirestore') private firestore: Firestore
  ) {}

  async ngOnInit() {
    const q = query(
      collection(this.firestore, 'documentos'),
      orderBy('nombre', 'asc')
    );

    const snapshot = await getDocs(q);

    this.documentos = snapshot.docs.map(d =>
      d.data() as Documento
    );
  }

  abrirPdf(url: string) {
    window.open(url, '_blank');
  }
}
