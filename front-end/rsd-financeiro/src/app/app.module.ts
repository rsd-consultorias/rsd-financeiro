import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NovaTrasacaoComponent } from './components/transacoes/nova-trasacao/nova-trasacao.component';
import { TransacoesComponent } from './components/transacoes/transacoes.component';
import { ListarTransacaoComponent } from './components/transacoes/listar-transacao/listar-transacao.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProdutosServicosComponent } from './components/produtos-servicos/produtos-servicos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FornecedoresComponent } from './components/fornecedores/fornecedores.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { IntegracoesComponent } from './components/integracoes/integracoes.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { ContasPagarReceberComponent } from './components/contas-pagar-receber/contas-pagar-receber.component';
import { FormatarNumeroDirective } from './directives/formatar-numero.directive';
import { FormatarNumeroPipe } from './pipes/formatar-numero.pipe';
import { SomenteNumeroDirective } from './directives/somente-numero.directive';
import { FormatoDataPipePipe } from './pipes/formato-data-pipe.pipe';
import { FormatoSaldoContabilPipe } from './pipes/formato-saldo-contabil.pipe';
import { AtivoFixoComponent } from './components/ativo-fixo/ativo-fixo.component';
import { TransacoesAlterarComponent } from './components/transacoes/transacoes-alterar/transacoes-alterar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NovaTrasacaoComponent,
    TransacoesComponent,
    ListarTransacaoComponent,
    PedidosComponent,
    ProdutosServicosComponent,
    ClientesComponent,
    FornecedoresComponent,
    RelatoriosComponent,
    IntegracoesComponent,
    ConfiguracoesComponent,
    ContasPagarReceberComponent,
    SomenteNumeroDirective,
    FormatarNumeroPipe,
    FormatarNumeroDirective,
    FormatoDataPipePipe,
    FormatoSaldoContabilPipe,
    AtivoFixoComponent,
    TransacoesAlterarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    FormatarNumeroPipe,
    FormatarNumeroDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
