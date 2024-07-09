import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AgenteComponent } from './components/agente/agente.component';
import { EjecutorComponent } from './components/ejecutor/ejecutor.component';
import { AgenteregisterreferidoComponent } from './components/agente/agenteregisterreferido/agenteregisterreferido.component';
import { AdminregisteragenteComponent } from './components/admin/adminregisteragente/adminregisteragente.component';
import { UidGuard } from './uid.guard';
import { LoginGuard } from './login.guard';
// import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  { path: '', component : HomeComponent,
  pathMatch: 'full',
  canActivate: [UidGuard]
},
  { path: 'login', component: LoginComponent,
  canActivate: [LoginGuard]
},
  { path: 'admin', component: AdminComponent,
  canActivate: [UidGuard]
},
  { path: 'agent', component: AgenteComponent,
  canActivate: [UidGuard], data: { role: 'agente' }
},
  { path: 'ejecutor', component: EjecutorComponent,
  canActivate: [UidGuard], data: { role: 'ejecutor' }
},
  { path: 'regisref', component: AgenteregisterreferidoComponent,
  canActivate: [UidGuard], data: { role: 'agente' }
},
  { path: 'regisagent', component: AdminregisteragenteComponent,
  canActivate: [UidGuard]
},
  { path: '**', redirectTo: '' }
];

