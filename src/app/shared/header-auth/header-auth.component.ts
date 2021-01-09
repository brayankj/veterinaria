import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.scss']
})
export class HeaderAuthComponent implements OnInit {

  public card = [
    { title: 'Seguridad', text: 'Crea una cuenta con protección de datos y contraseña', img: '../../../assets/imgs/seguridad.png' },
    { title: 'Facilidad de Pagos', text: 'Costos accesibles para el tratamiento de tu mascota', img: '../../../assets/imgs/ticket.png' },
    { title: 'Cuidados', text: 'Contamos con veterinarios especializados para el cuidado de tu mascota', img: '../../../assets/imgs/alimento.png' },
    { title: 'Horarios flexibles', text: 'Horarios y citas flexibles para cubrir un plan exhaustivo', img: '../../../assets/imgs/citas.png' },
  ];
  public uls = [
    { icon: '../../../assets/imgs/facebook.png', name: 'facebook.png' },
    { icon: '../../../assets/imgs/instagram.png', name: 'instagram.png' },
    { icon: '../../../assets/imgs/whatsapp.png', name: 'whatsapp.png' },
    { icon: '../../../assets/imgs/twitter.png', name: 'twitter.png' },
  ]
  constructor(
    
  ) { }

  ngOnInit(): void {
  }

  

}
