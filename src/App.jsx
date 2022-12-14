import React, { useRef, useState, useEffect } from 'react';
import { Nav, NavDropdown, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import './App.css';

import FormContato from './components/FormContato';
import NavClient from './components/NavClient';
import WhatsappButton from './components/WhatsappButton';
import Ebook from './arquivos/pdfs/ebook.pdf';
import VideoHome from './arquivos/videos/videoEcoHome.mp4';

import Logo from './arquivos/imgs/logo.png';

import ModalCarrossel from './components/ModalCarrossel';
import CarrosselEmissorNF from './components/CarrosselEmissorNF';
import CarrosselPDV from './components/CarrosselPDV';
import CarrosselApp from './components/CarrosselApp';
import CarrosselADMApp from './components/CarrosselADMApp';
import CarrosselCRM from './components/CarrosselCRM';
import CarrosselADMCRM from './components/CarrosselADMCRM';

import './components/PopoverFont.css';

const regexClass = /(Font-[a-zA-Z]+)/g;

const fonts = [
	'Font-Arial',
	'Font-TimesNewRoman',
	'Font-FranklinGothic',
    'Font-NotoSerif',
    'Font-Lato',
    'Font-Jost',
    'Font-FragmentMono',
	'Font-OpenSans',
	'Font-PTSerif',
	'Font-Roboto',
	'Font-Playfair'
];

function App(){
	const topo = useRef(null);
	const vantagens = useRef(null);
	const empresa = useRef(null);
	const produtosEmissor = useRef(null);
	const produtosPDV = useRef(null);
	const produtosApp = useRef(null);

	const fontsList = useRef(null);
	const cardFonts = useRef(null);
	const [cardTopOffset, setCardTopOffset] = useState(null);
	const [cardRightOffset, setCardRightOffset] = useState(null);
	const toChangeFont = useRef(null);

	const [showEmissorNF, setShowEmissorNF] = useState(false);

    const handleShowEmissorNF = () => setShowEmissorNF(true);
    const handleCloseEmissorNF = () => setShowEmissorNF(false);

	const [showPDV, setShowPDV] = useState(false);

    const handleShowPDV = () => setShowPDV(true);
    const handleClosePDV = () => setShowPDV(false);

	const [showApp, setShowApp] = useState(false);

    const handleShowApp = () => setShowApp(true);
    const handleCloseApp = () => setShowApp(false);

	const scrollToSection = (elementRef) => {
		if(!elementRef)
		  return;
	
		window.scrollTo({
		  top: elementRef.current.offsetTop - 200,
		  behavior: 'smooth'
		});
	}

	useEffect(() => {

		function renderFontsList(){
			if(!toChangeFont.current)
				return;

			fontsList.current = fonts.map(f => 
                <span key={f} className={`itemList p-2 ${f}`} 
				onClick={() => changeFont(f)}>{f}</span> 
                )
				
			cardFonts.current.classList.remove('d-none');
		}

		renderFontsList();

	}, [toChangeFont.current]);

	const renderCardFonts = (event) => {
		if(toChangeFont.current == event.currentTarget){
			cardFonts.current.classList.add('d-none');
			toChangeFont.current = null;
			return;
		}

		toChangeFont.current = event.currentTarget;

		const cardHeight = toChangeFont.current.clientHeight;

		setCardTopOffset(event.clientY - cardHeight);
		setCardRightOffset(event.clientX);

		// console.log(cardFonts.current.classList.toggle('d-none'));

		// cardFonts.current.classList.toggle('d-none');
	}

	function changeFont(font){
		// console.log(target);
		const listaClassesElemento = toChangeFont.current.classList;

		const classToRemove = listaClassesElemento.value.match(regexClass);
		listaClassesElemento.remove(classToRemove);
		
		const selectedClass = classToRemove ? classToRemove[0] : 'font-teste';

		if(selectedClass === font)
			return;

		listaClassesElemento.add(font);
	}

  return (
    <>

	<div style={{top: `${cardTopOffset}px`, left: `${cardRightOffset}px`}} ref={cardFonts} 
		className='d-none cardFonts text-center' target={toChangeFont.current}>
		<Card>
			<Card.Body className='px-0'>
				{fontsList.current ? fontsList.current.map(e => e) : ''}
			</Card.Body>
		</Card>
	</div>

    <NavClient needHide={true}>
        <Nav className='w-100 d-flex justify-content-end'>
          <Nav.Link onClick={() => scrollToSection(vantagens)} href="#">Vantagens</Nav.Link>
          <Nav.Link onClick={() => scrollToSection(empresa)} href="#">Empresa</Nav.Link>
          {/* <Nav.Link onClick={() => scrollToSection(produtos)} href="#">Produtos</Nav.Link> */}
		  <NavDropdown title='Produtos' menuVariant='dark'>
            <NavDropdown.Item href='#' onClick={() => scrollToSection(produtosEmissor)}>Emissor Fiscal</NavDropdown.Item>
            <NavDropdown.Item href='#' onClick={() => scrollToSection(produtosPDV)}>PDV</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='#'  onClick={() => scrollToSection(produtosApp)}>Aplicativo</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Downloads' menuVariant='dark'>
            <NavDropdown.Item target='_blank' href={Ebook}>E-book NFCe</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='https://anydesk.com/pt/downloads/thank-you?dv=win_exe' target='_blank'>AnyDesk</NavDropdown.Item>
            <NavDropdown.Item href='https://download.teamviewer.com/download/TeamViewer_Setup_x64.exe' target='_blank'>Team Viewer</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href='politicaeprivacidade'>Pol??tica de Privacidade</Nav.Link>
        </Nav>
    </NavClient>

    <WhatsappButton />

    <Container fluid className='allFather'>
        <Row ref={topo} className='h100v'>
          <video autoPlay muted loop className='myVideo'>
            <source src={VideoHome} type="video/mp4"/>
          </video>

          <Col xs={12} md={4} className='d-flex flex-column justify-content-start zIndex99'>
			<div className='w-100 d-flex justify-content-center logoVideo'>
				<img src={Logo} className='img-fluid' width={148} height={79} alt='logo'/>
			</div>

            <div className={`fundoAzul text-white rounded-4 w-100 p-3 m-3`}>
              <div className='text-center pt-2 textoTitulo'><b>SISTEMAS APLICATIVOS E CONSULTORIA PARA A SUA EMPRESA</b></div>
              <hr/>
              <div className='w-100 px-3 justify-text'>
				A ECO Sistemas e Solu????es presta servi??o de consultoria em automa????o comercial, com destaque em sistemas e equipamentos para o com??rcio em geral. 
				Tem como foco a implanta????o e o suporte de sistemas comerciais para micro e pequenas empresas.
              </div>
            </div>

          </Col>

          <Col xs={0} md={4} ></Col>

          <Col xs={12} md={3} className='d-flex align-items-center justify-content-center zIndex99'>
            <FormContato />
          </Col>
        </Row>


		<Row ref={vantagens} className='justify-content-center pb-4'>
			<Col xs={12} className='text-center m-5 p-2 textoTitulo'>
				<h2 onClick={renderCardFonts}>VANTAGENS NA AUTOMA????O COMERCIAL</h2>
			</Col>

			<Col xs={12} sm={6} lg={3} className={`text-dark m-2 rounded-4 p-4 fundoCard`}>            
				<div className='text-center textoTituloCard' onClick={renderCardFonts}>RESULTADOS DA AUTOMA????O</div>
				<ul className='textoCard' onClick={renderCardFonts}>
					<li>Plano e elabora????o do processo da empresa</li>
					<li>Organiza????o dos setores da empresa</li>
					<li>Revis??o e ajuste da classifica????o fiscal dos produtos</li>
					<li>Diminui????o dos impostos pagos a maior</li>
					<li>Integra????o com outros sistemas</li>
					<li>Gera????o dos arquivos xml mensal para conferencia da contabilidade</li>
					<li>Aumento das vendas atrav??s do aplicativo pr??prio da loja</li>
					<li>Aumento das vendas atrav??s do aplicativo para vendedores externos</li>
				</ul>
			</Col>

			<Col xs={12} sm={6} lg={3} className={`text-dark m-2 rounded-4 p-4 fundoCard`}>
				<div className='text-center textoTituloCard' onClick={renderCardFonts}>PROCESSOS DA AUTOMA????O</div>
				<ul className='textoCard' onClick={renderCardFonts}>
					<li>Ganho na produtividade</li>
					<li>Integra????o dos setores</li>
					<li>Padroniza????o do produtos e servi??os</li>
					<li>Redu????o de erros manuais</li>
					<li>Hist??rico de compras e vendas</li>
					<li>Redu????o de custos</li>
					<li>Melhoria na tomada de decis??es</li>
					<li>An??lises abertura e fechamento do caixa</li>
				</ul>
			</Col>

			<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
				<div className='text-center textoTituloCard' onClick={renderCardFonts}>CONTROLES DA AUTOMA????O</div>

				{/* aqui */}
				<ul className='textoCard' onClick={renderCardFonts}>
					<li>Redu????o de custos e desperd??cios</li>
					<li>Melhoria na log??stica</li>
					<li> Financeiro a pagar receber</li>
					<li> Emiss??o de documentos fiscais</li>
					<li>Controle de estoque</li>
					<li>Controle sobre as vendas</li>
					<li>Gest??o do relacionamento com os clientes</li>
					<li>Controle sobre o faturamento geral</li>
					<li>Impulso para as vendas</li>
					<li>Menos erros humano</li>
				</ul>
			</Col>
		</Row>

			{/* EMPRESA */}
			{/* <div ref={empresa} className='d-flex justify-content-center mt-5 pt-1'>
				<div className='w-50 divisor'></div>
			</div> */}

			<Row ref={empresa} className='justify-content-center pb-4'>
				<Col  xs={12} className='text-center m-5 pt-2 textoTitulo'>
					<h2 onClick={renderCardFonts}>NOSSA HIST??RIA</h2>
				</Col>
				<Col xs={9} className='mb-2 pb-4 textoAdjacente justify-text'>
					<p>A ECO Sistemas e Solu????es ?? uma empresa especializada na consultoria em automa????o comercial, somos especialistas na  instala????o e configura????o do sistema de venda ECO Sistema e PDV Win frente de caixa, revis??o e atualiza????o tribut??ria dos cadastros dos produtos para venda, configura????o dos equipamentos para ambiente do com??rcio varejista.  </p>
					<p>Desenvolvimento do aplicativo Loja Online para o com??rcio varejista, pagamento em cart??o com as melhores taxas de mercado, calculo do frete por CEP na venda.  Painel Administrativo intuitivo com bot??es de fun????o simples para publicar os produtos da loja.</p>
					<p>Desenvolvimento do aplicativo CRM WIN, uma ferramenta indispens??vel para afiliados e distribuidores alavancarem a venda dos produtos das empresas de Marketing Multinivel.</p>
				</Col>
				<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
					<div className='text-center textoTituloCard' onClick={renderCardFonts}>MISS??O</div>
					<span className='textoCard' onClick={renderCardFonts}>
						Promover o melhor desempenho do comercio atrav??s das tecnologias do mercado, 
						solucionando suas necessidades em informatiza????o primando pela ??tica e confiabilidade.
					</span>
				</Col>

				<Col xs={12} sm={6} lg={3} className={`text-dark m-2 rounded-4 p-4 fundoCard`}>
					<div className='text-center textoTituloCard' onClick={renderCardFonts}>VIS??O</div>
					<span className='textoCard' onClick={renderCardFonts}>
						Ser refer??ncia na presta????o de servi??o em automa????o comercial atrav??s de parcerias s??lidas 
						com f??bricas de software e distribuidores de equipamentos.
					</span>
				</Col>

				<Col ref={empresa} xs={12} sm={6} lg={3} className={`text-dark m-2 rounded-4 p-4 fundoCard`}>            
					<div className='text-center textoTituloCard' onClick={renderCardFonts}>VALORES</div>
					<span className='textoCard' onClick={renderCardFonts}>
						Honestidade e credibilidade
						<br/>Acessibilidade para o usu??rio
						<br/>Excel??ncia no atendimento
						<br/>Compromisso com o cliente
						<br/>Oportunidade para novas gera????es
					</span>
				</Col>
			</Row>

			{/* PRODUTOS EMISSOR*/}
			{/* <div ref={produtosEmissor} className='d-flex justify-content-center mt-5 pt-1'>
				<div className='w-50 divisor'></div>
			</div> */}

			<Row ref={produtosEmissor} className='justify-content-center pb-4'>
				<Col xs={12} className='text-center m-4 pt-3 textoTitulo'>
					<h2 onClick={renderCardFonts}>PRODUTOS</h2>
				</Col>
				<Col xs={12} className='mb-4 pb-2 text-center'>
					<h3 className='textoTitulo' onClick={renderCardFonts}>SOFTWARE ECO SISTEMA EMISSOR FISCAL</h3>
				</Col>
				
				{/* IN??CIO CARROSSEL IMAGENS */}
				<Col xs={8} className='mb-4'>
					<CarrosselEmissorNF click={handleShowEmissorNF}/>
				</Col>

				<Modal show={showEmissorNF} onHide={handleCloseEmissorNF} centered dialogClassName='w90per'>
					<ModalCarrossel titulo='SOFTWARE ECO SISTEMA EMISSOR FISCAL'>
						<CarrosselEmissorNF />
					</ModalCarrossel>
				</Modal>

				{/* FIM CARROSSEL IMAGENS */}

				<Col xs={9} className='textoAdjacente' onClick={renderCardFonts}>
					<p>Software preparado para emiss??o de documentos fiscais e completa gest??o da sua empresa com m??dulos de vendas, compras, estoque, log??stica, liga????o bancaria, plataforma online de vendas e muito mais.</p>
					<p>O Emissor Fiscal ?? um software com uma extensiva lista de funcionalidades e se voc?? necessita de um ERP completo para Gest??o ou um PDV para Automa????o, ele ?? certamente a solu????o.</p>
					<p>Suporte tecnicamente capacitado para oferecer o melhor suporte, de treinamento  e at?? ajustes de software para as suas necessidades especificas.</p>
				</Col>
			</Row>

			<Row className='justify-content-center pb-4'>
				<Col xs={12} className='text-center m-5 pb-2 textoTitulo'>
					<h2 onClick={renderCardFonts}>Caracter??sticas</h2>
				</Col>
				<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul className='textoCard' onClick={renderCardFonts}>
						<li>Configura????o de Tributos</li>
						<li>Hist??rico de movimento de caixa</li>
						<li>Importa????o autom??tica de notas da SEFAZ</li>
						<li>Login e logout de operadores de caixa</li>
						<li>Compat??vel com todos os regimes fiscais</li>
						<li>Or??amentos de compra e venda</li>
						<li>Pedidos de compra e venda</li>
						<li>Recebimentos / contas a receber </li>
						<li>Confirma????o manual de entradas em estoque</li>
						<li>Perfil de acesso configur??vel por usu??rio</li>
					</ul>
				</Col>
				<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul className='textoCard' onClick={renderCardFonts}>
						<li>Cadastro de produtos</li>
						<li>Cadastro de Clientes </li>
						<li>Cadastro de Fornecedores</li>
						<li>Cadastro de Transportadoras</li>
						<li>Cadastro de Vendedores</li>
						<li>Cadastro de Organiza????es</li>
						<li>Cadastro de m??todos de Pagamento</li>
						<li>Emiss??o de nota fiscal / NF-e </li>
						<li>Emiss??o de nota fiscal ao consumidor / NFC-e </li>
						<li>Pr??-visualiza????o da NF-e antes da emiss??o</li>
					</ul>
				</Col>
				<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul className='textoCard' onClick={renderCardFonts}>
						<li>Atribui????o inteligente de c??digos tribut??rios</li>
						<li>Pesquisa e Inutiliza????o de n?? de Nota</li>
						<li>Impress??o de Carta de Corre????o </li>
						<li>Importa????o de arquivos XML de NF-e, NFCe</li>
						<li>Cadastrando autom??tico de produtos e fornecedores pelas NF-e ou XML</li>
						<li>Comandas de mesas, avulsas, delivery e pra??a de alimenta????o</li>
						<li>Impress??o de pedidos na cozinha ou copa</li>
						<li>Relat??rio de abertura e fechamento do caixa</li>
					</ul>
				</Col>
				<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul className='textoCard' onClick={renderCardFonts}>
						<li>Disponibilidade de atualiza????es regulares</li>
						<li>Impress??o de pedidos agrupados ou separados</li>
						<li>Nota Fiscal em XML e PDF</li>
						<li>Compat??vel com PDV de tela t??til</li>
						<li>Suporte a certificados A1 A3</li>
						<li>Calculo se substitui????o tribut??ria ICMS-ST</li>
						<li>Alertas de prazo de validade do certificado</li>
						<li>Impress??o de etiquetas</li>
						<li>Hist??rico detalhado do PDV por usu??rio</li>
						<li>Retiradas e suprimentos do caixa do PDV</li>
					</ul>
				</Col>
				<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul className='textoCard' onClick={renderCardFonts}>
						<li>Emiss??o de NFC-e em conting??ncia</li>
						<li>Cancelamento de NFC-e</li>
						<li>NFC-e em modo conting??ncia com falha de rede</li>
						<li>Backup e restaura????o de base dados</li>
						<li>Dezenas de relat??rios</li>
						<li>N??mero ilimitado de instala????es </li>
						<li>Envio autom??tico arquivos de XML para Contador em lotes</li>
						<li>Produtos de grade simples e composta</li>
						<li>Perfis de acesso configur??veis</li>
						<li>??cones de acesso r??pido</li>
					</ul>
				</Col>
				<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul className='textoCard' onClick={renderCardFonts}>
						<li>Vendas a credito PDV com limites por cliente</li>
						<li>Utilit??rios para funcionalidades avan??adas</li>
						<li>TEF (Transfer??ncia Eletr??nica de Fundos) da STONE e ZOOP</li>
						<li>Consultar chave NF-e de compra/venda</li>
						<li>Analise de produtos por CFOP de entrada e sa??da</li>
						<li>Defini????o e consulta do hist??rico de vendas mensal</li>
						<li>Consulta de produtos expirados</li>
						<li>Produtos compostos com subprodutos</li>
						<li>Venda de combust??veis e g??s</li>
						<li>Cadastro de produtos pela NF-e de compra</li>
					</ul>
				</Col>
			</Row>

			{/* PRODUTOS PDV */}
			{/* <div ref={produtosPDV} className='d-flex justify-content-center mt-5 pt-1'>
				<div className='w-50 divisor'></div>
			</div> */}

			<Row className='justify-content-center pb-4'>
				<Col xs={12} className=' m-5 pb-2 text-center'>
					<h3 className='textoTitulo' onClick={renderCardFonts}>SOFTWARE ECO SISTEMA PDV WIN</h3>
				</Col>

				{/* IN??CIO CARROSSEL IMAGENS */}
				<Col xs={8} className='mb-4'>
					<CarrosselPDV click={handleShowPDV}/>
				</Col>

				<Modal show={showPDV} onHide={handleClosePDV} centered dialogClassName='w90per'>
					<ModalCarrossel titulo='SOFTWARE ECO SISTEMA PDV WIN'>
						<CarrosselPDV />
					</ModalCarrossel>
				</Modal>

				{/* FIM CARROSSEL IMAGENS */}

				<Col xs={9} className='textoAdjacente' onClick={renderCardFonts}> 
					<p>Software sem limita????o no n??mero de documentos fiscais emitidos e ainda disponibilizamos upgrades para que possa manter o software compat??vel com as demandas da SEFAZ e o funcionando atualizado. </p>
					<p>Cumprindo com todas as disposi????es legais impostas pela SEFAZ, este software, permite a emiss??o de NFC-e ou CF-e+SAT. Se n??o est?? obrigado a emitir documentos fiscais, pode tamb??m utilizar este PDV apenas para gest??o e controle do seu comercio.</p>
					<p>Suporte especializado para  lhe ajudar  e at?? mesmo um upgrade de software que potencie ainda mais as suas vendas.</p>
					<p>O software permite tamb??m criar Pedidos, Or??amentos e at?? mesmo emiss??o Notas Fiscais e com isto voc?? tem a possibilidade de emitir documentos no PDV e tamb??m na retaguarda.</p>
					<p>Disponibilizamos uma vers??o de teste completa  do software com muitas funcionalidades adicionais. </p>
					<p>Entre em contato agora mesmo e comece a fazer uso de um PDV completo por 30 dias Gr??tis. </p>
				</Col>
			</Row>

			<Row className='justify-content-center pb-4'>
				<Col xs={12} className='text-center m-5 pb-2 textoTitulo'>
					<h2 onClick={renderCardFonts}>Caracter??sticas</h2>
				</Col>
				
			
				<Col xs={12} sm={6} lg={4} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul onClick={renderCardFonts}>
						<li>Transpar??cia para com o cliente</li>
						<li>Listar produtos da venda</li>
						<li>Mostrar valor dos produtos</li>
						<li>Quantidades digitadas</li>
						<li>M??todo pagamento selecionado</li>
						<li>Resumo da venda</li>
						<li>Evitar desvios no caixa</li>
						<li>Agilizar vendas</li>
						<li>Para Celular ou Tablet</li>
						<li>Todos os tamanhos de tela </li>
					</ul>
				</Col>

				<Col xs={12} sm={6} lg={4} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul onClick={renderCardFonts}>
						<li>Layout selecion??vel</li>
						<li>Layout program??vel por HTML</li>
						<li>Tela de PDV para cliente</li>
						<li>Apresenta????o do valor de troco</li>
						<li>Tela vertical ou horizontal</li>
						<li>Anima????es gr??ficas</li>
						<li>Imagem dos produtos</li>
						<li>Resumo da compra com totalizador</li>
						<li>Cliente confere as opera????es efetuadas no caixa</li>
						<li>Funcionamento sincronizado com o PDV</li>
					</ul>
				</Col>

				<Col xs={12} sm={6} lg={4}  className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul onClick={renderCardFonts}>
						<li>Utilit??rios para funcionalidades avan??adas</li>
						<li>TEF (Transfer??ncia Eletr??nica de Fundos) da STONE e ZOOP</li>
						<li>Consultar chave NF-e de compra/venda</li>
						<li>Analise de produtos por CFOP de entrada e sa??da</li>
						<li>Defini????o e consulta do hist??rico de vendas mensal</li>
						<li>Consulta de produtos expirados</li>
						<li>Produtos compostos com subprodutos</li>
						<li>Venda de combust??veis e g??s</li>
						<li>Cadastro de produtos pela NF-e de compra</li>
					</ul>
				</Col>

				<Col xs={12} sm={6} lg={4} className={`m-2 rounded-4 p-4 fundoCard`}>
					<ul onClick={renderCardFonts}>
						<li>Registro de opera????es n??o conclu??das </li>
						<li>NFC-e em modo conting??ncia com falha de rede</li>
						<li>Apar??ncia personaliz??vel</li>
						<li>Hist??rico detalhado do PDV por usu??rio</li>
						<li>Importa????o de arquivos XML de NF-e, NFCe</li>
						<li>Cancelamento de NFC-e</li>
						<li>Descontos/Acr??scimos configur??veis por m??todo de pagamento</li>
						<li>Pesquisa e inutiliza????o de n?? de nota</li>
						<li>Comandas de mesas avulsas, delivery e pra??a de alimenta????o</li>
						<li>Vendas a credito PDV com limites por cliente</li>
					</ul>
				</Col>
			</Row>

			{/* PRODUTOS App */}
			{/* <div ref={produtosApp} className='d-flex justify-content-center mt-5 pt-1'>
				<div className='w-50 divisor'></div>
			</div> */}

			<Row className='justify-content-center pb-4'>
				<Col xs={12} className=' m-5 pb-2 text-center'>
					<h3 className='textoTitulo' onClick={renderCardFonts}>APLICATIVO LOJA ONLINE</h3>
				</Col>

				{/* IN??CIO CARROSSEL IMAGENS */}
				<Col xs={6} className='mb-4'>
					<CarrosselApp click={handleShowApp}/>
				</Col>

				<Modal show={showApp} onHide={handleCloseApp} centered dialogClassName='w90per'>
					<ModalCarrossel titulo='APLICATIVO LOJA ONLINE'>
						<CarrosselApp />
					</ModalCarrossel>
				</Modal>

				{/* FIM CARROSSEL IMAGENS */}

				<Col xs={9} className='textoAdjacente' onClick={renderCardFonts}> 
					<p>O aplicativo Loja Online tem o intuito de apresentar as lojas do varejo, uma maneira mais f??cil de ingressar no e-commerce e alavancar seus neg??cios.</p>
					<p>Vers??o com integra????o para pagamento em cart??o com as melhores taxas do mercado, integra????o com Melhor Envio para calculo do frete, al??m de visual com tecnologia Google para oferecer aos seus participantes a melhor experi??ncia de utiliza????o.</p>
					<p>Novo Painel Administrativo, criamos bot??es de f??cil acesso onde voc?? poder?? cadastrar seus produtos e publicar sua loja com facilidade acompanhar seus pedidos e verificar seus pagamentos no painel financeiro.</p>
				</Col>
			</Row>

			<Row className='justify-content-center pb-4'>
				<Col xs={12} className='text-center m-5 p-2 textoTitulo'>
					<h3 onClick={renderCardFonts}>PAINEL ADMINISTRATIVO</h3>
				</Col>
				<Col xs={6} className='mb-4'>
					<CarrosselADMApp click={handleShowApp}/>
				</Col>

				<Modal show={showApp} onHide={handleCloseApp} centered dialogClassName='w90per'>
					<ModalCarrossel titulo='PAINEL ADMINISTRATIVO'>
						<CarrosselADMApp />
					</ModalCarrossel>
				</Modal>
			</Row>

			<Row className='justify-content-center pb-4'>
				<Col xs={12} className='text-center m-5 p-2 textoTitulo'>
					<h3 onClick={renderCardFonts}>COMO FUNCIONA VENDA ONLINE!</h3>
				</Col>
				
				<Col xs={9} className='mb-2 pb-4 textoAdjacente justify-text'>
					<p>Olhe ?? sua volta e veja onde est?? a aten????o das pessoas. Seja no tr??nsito, em casa ou at?? no 
					trabalho, essas pequenas telas brilhantes est??o sempre a um bra??o de dist??ncia. </p>

					<p>?? ineg??vel a facilidade que os dispositivos m??veis trouxeram para nossas vidas di??rias.</p>

					<p>Evidentemente, sua empresa ficar?? exposta a v??rios olhos se voc?? investir em uma forte presen??a 
					digital. Mas sua marca e logotipo precisam ser vistos quando as pessoas desbloqueiam o celular. 
					Um aplicativo ?? sempre visto e lembrado, um site, por outro lado, est?? ???escondido??? dentro do 
					navegador. vamos comparar as duas experi??ncias:</p>
				</Col>

				<Col xs={12} sm={6} lg={4} className={`m-2 rounded-4 p-4 fundoCard`}>
					<div className='text-center textoTituloCard' onClick={renderCardFonts}>SITE RESPONSIVO</div>
					<span className='textoCard' onClick={renderCardFonts}>
						O usu??rio precisa receber algum est??mulo forte (an??ncio) para abrir o navegador e
						digitar corretamente o site da empresa. Ap??s isso, ele precisa relembrar ou criar um novo login 
						de acesso, e ent??o, finalmente, o poss??vel cliente pode navegar e comprar 
						(se n??o houver outra distra????o pelo caminho)
					</span>
				 </Col>
				 
				<Col xs={12} sm={6} lg={4} className={`m-2 rounded-4 p-4 fundoCard`}>
					<div className='text-center textoTituloCard' onClick={renderCardFonts}>APLICATIVO</div>
					<span className='textoCard' onClick={renderCardFonts}>
						Entre as maiores vantagens dos aplicativos, est??o, a possibilidade de inova????o, 
						a maior proximidade com os clientes, a coleta de dados dos usu??rios e a maior vantagem competitiva.
					</span>
				 </Col>
			</Row>

			<Row className='justify-content-center pb-4'>
				<Col xs={12} className=' m-5 p-3 text-center'>
					<h3 className='textoTitulo' onClick={renderCardFonts}>APLICATIVO CRM WIN</h3>
				</Col>

				{/* IN??CIO CARROSSEL IMAGENS */}
				<Col xs={6} className='mb-4'>
					<CarrosselCRM click={handleShowApp}/>
				</Col>

				<Modal show={showApp} onHide={handleCloseApp} centered dialogClassName='w90per'>
					<ModalCarrossel titulo='APLICATIVO CRM WIN'>
						<CarrosselCRM />
					</ModalCarrossel>
				</Modal>

				{/* FIM CARROSSEL IMAGENS */}

				<Col xs={9} className='textoAdjacente' onClick={renderCardFonts}> 
					<p>
						O Aplicativo CRM  WiN, foi desenvolvido  com o objetivo  de ser utilizado por distribuidores 
						afiliados no plano de neg??cio comercial das empresas que gerenciam a rede de distribuidores atrav??s 
						de uma plataforma de Marketing Multin??vem . Sua funcionalidade ?? simples e intuitiva para o usu??rio 
						operar e obter informa????es privilegiadas na sua prospec????o da venda e planejamento do neg??cio comercial.
					</p>
					<p>
						Atrav??s do Aplicativo CRM  WiN, o distribuidor afiliado cadastra o cliente potencial comprador do produto, 
						agenda visita comercial, localiza o endere??o do cliente atrav??s do Google Maps, consulta a lista de 
						clientes aniversariantes do dia, pesquisa o cadastro do cliente na base de dados, tamb??m desenvolvemos 
						um m??todo para o distribuidor pesquisar quais produtos e quantas vezes o cliente clicou nos produtos da 
						loja online. a comunica????o com os consumidores cadastrados  ?? feita de dentro do aplicativo que esta integrado 
						ao link do Whatssap que faz a liga????o para o  envio de mensagens, envio de imagens v??deos e demais conte??dos 
						informativos de marketing do neg??cio da ???empresa fornecedora do produto???.	
					</p>
					<p><b>???O distribuidor vende e n??s ajudamos!???</b></p>
				</Col>
			</Row>

			<Row className='justify-content-center pb-4'>
				<Col xs={12} className='text-center m-5 p-2 textoTitulo'>
					<h3 onClick={renderCardFonts}>PAINEL ADMINISTRATIVO CRM WIN</h3>
				</Col>

				<Col xs={6} className='mb-4'>
					<CarrosselADMCRM click={handleShowApp}/>
				</Col>

				<Modal show={showApp} onHide={handleCloseApp} centered dialogClassName='w90per'>
					<ModalCarrossel titulo='PAINEL ADMINISTRATIVO CRM WIN'>
						<CarrosselADMCRM />
					</ModalCarrossel>
				</Modal>
				
				<Col xs={9} className='mb-2 pb-4 textoAdjacente justify-text'>
					<p>O Painel Administrativo, fica ligado a API Rest do painel de gerenciamento dos afiliados 
					e API Rest do aplicativo Win. Os dados s??o coletados a partir dos cadastros realizados no
						painel de gerenciamento dos afiliados e, distribuidores, pedidos, clientes, consumidores 
						s??o importados e sua base de dados coletada fica armazenada em servidor Web, para 
						consultas da empresa distribuidora dos produtos na rede.</p>
					<p>
						A Plataforma ADMIN Win, foi desenvolvida para ser utilizada pela dire????o da empresa e 
						colaboradores que definem os processos de marketing e lan??amentos dos produtos para prospec????o da 
						venda na rede.
					</p>
				</Col>
			</Row>

    </Container>
    </>
  );
}

export default App;
