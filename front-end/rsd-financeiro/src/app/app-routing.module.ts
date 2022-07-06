import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtivoFixoComponent } from './components/ativo-fixo/ativo-fixo.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { ContasPagarReceberComponent } from './components/contas-pagar-receber/contas-pagar-receber.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FornecedoresComponent } from './components/fornecedores/fornecedores.component';
import { IntegracoesComponent } from './components/integracoes/integracoes.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProdutosServicosComponent } from './components/produtos-servicos/produtos-servicos.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { ListarTransacaoComponent } from './components/transacoes/listar-transacao/listar-transacao.component';
import { NovaTrasacaoComponent } from './components/transacoes/nova-trasacao/nova-trasacao.component';
import { TransacoesComponent } from './components/transacoes/transacoes.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'produtos-servicos', component: ProdutosServicosComponent },
  { path: 'contas-pagar-receber', component: ContasPagarReceberComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'fornecedores', component: FornecedoresComponent },
  { path: 'ativo-fixo', component: AtivoFixoComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  {
    path: 'transacoes', component: TransacoesComponent,
    children: [
      { path: 'nova-transacao', component: NovaTrasacaoComponent },
      { path: '**', component: ListarTransacaoComponent }
    ]
  },
  { path: 'integracoes', component: IntegracoesComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
