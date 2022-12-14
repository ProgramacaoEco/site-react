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

	const scrollToSection = (elementRef) => {
		if(!elementRef)
		  return;
	
		window.scrollTo({
		  top: elementRef.current.offsetTop,
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
            <NavDropdown.Item href='#'>Aplicativo</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title='Downloads' menuVariant='dark'>
            <NavDropdown.Item target='_blank' href={Ebook}>E-book NFCe</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href='https://anydesk.com/pt/downloads/thank-you?dv=win_exe' target='_blank'>AnyDesk</NavDropdown.Item>
            <NavDropdown.Item href='https://download.teamviewer.com/download/TeamViewer_Setup_x64.exe' target='_blank'>Team Viewer</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href='politicaeprivacidade'>Pol??tica e Privacidade</Nav.Link>
        </Nav>
    </NavClient>

    <WhatsappButton />

    <Container fluid>
        <Row ref={topo} className='h100v'>
          <video autoPlay muted loop className='myVideo'>
            <source src={VideoHome} type="video/mp4"/>
          </video>

          <Col xs={12} md={4} className='d-flex flex-column justify-content-start zIndex99'>
			<div className='w-100 d-flex justify-content-center p-5'>
				<img src={Logo} className='img-fluid' width={148} height={79} alt='logo'/>
			</div>

            <div className={`bg-dark bg-opacity-50 text-white rounded-4 w-100 p-3 m-3`}>
              <div className='text-center pt-2'>SISTEMAS APLICATIVOS E CONSULTORIA PARA A SUA EMPRESA</div>
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

		<Row>
			<Col xs={10}>

			</Col>
		</Row>

		<Row className='d-flex justify-content-center m-2'>
			<Col ref={vantagens} xs={12} className='text-center m-5 p-2 textoTitulo'><h1 onClick={renderCardFonts}>VANTAGENS</h1></Col>
			<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
			<div className='text-center textoTitulo' onClick={renderCardFonts}>CONTROLES ATRAV??S DA AUTOMA????O COMERCIAL</div>

			{/* aqui */}
			<ul className='textoCard' onClick={renderCardFonts}>
				<li>Redu????o de custos e desperd??cios</li>
				<li>Melhoria na log??stica</li>
				<li>Controle sobre as vendas</li>
				<li>Gest??o do relacionamento com os clientes</li>
				<li>Controle sobre o faturamento</li>
				<li>Impulso para as vendas</li>
				<li>Menos erros humanos</li>
			</ul>
			</Col>

			<Col xs={12} sm={6} lg={3} className={`text-dark m-2 rounded-4 p-4 fundoCard`}>
				<div className='text-center textoTitulo' onClick={renderCardFonts}>PROCESSOS ATRAV??S DA AUTOMA????O DE PROCESSOS</div>
				<ul className='textoCard' onClick={renderCardFonts}>
					<li>Ganho na produtividade</li>
					<li>Integra????o dos setores</li>
					<li>Padroniza????o do produtos e servi??os</li>
					<li>Redu????o de custos</li>
					<li>An??lises abertura e fechamento do caixa</li>
					<li>Melhoria na tomada de decis??es</li>
				</ul>
			</Col>

			<Col xs={12} sm={6} lg={3} className={`text-dark m-2 rounded-4 p-4 fundoCard`}>            
				<div className='text-center textoTitulo' onClick={renderCardFonts}>RESULTADOS NA AUTOMA????O COMERCIAL</div>
				<ul className='textoCard' onClick={renderCardFonts}>
					<li>Plano e elabora????o do processo da empresa</li>
					<li>Organiza????o dos setores da empresa</li>
					<li>Revis??o e ajuste da classifica????o fiscal dos produtos</li>
					<li>Diminui????o d impostos pagos a maior</li>
					<li>Integra????o com outros sistemas</li>
					<li>Gera????o dos arquivos xml mensal para conferencia da contabilidade</li>
					<li>Aumento das vendas atrav??s do aplicativo pr??prio da loja</li>
					<li>Aumento das vendas atrav??s do aplicativo para vendedores externos</li>
				</ul>
			</Col>
        </Row>

		{/* EMPRESA */}
		<div ref={empresa} className='d-flex justify-content-center mt-5 pt-1'>
			<div className='w-50 divisor'></div>
		</div>

		<Row className='d-flex justify-content-center m-2'>
			<Col  xs={12} className='text-center m-5 p-2 textoTitulo'><h1 onClick={renderCardFonts}>NOSSA HIST??RIA</h1></Col>
			<Col xs={9} className='mb-2 pb-4'>
				<h5 className='textoTitulo justify' onClick={renderCardFonts}>Atuante no mercado desde 2007, a ECO Sistemas e Solu????es ?? uma empresa especializada na consultoria em automa????o comercial, 
				cujo trabalho consiste em desenvolver  instalar e configurar sistemas e aplicativos, dar treinamento e suporte 
				para operadores de retaguarda e frente de caixa do com??rcio em geral. 
				<br/>Aliada aos conceitos de respeito e 
				compromisso com parceiros e clientes, a ECO Sistemas se prop??e gerar resultados positivos e 
				reduzir custos nos processos de automa????o comercial.</h5>
			</Col>
			<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
				<div className='text-center textoTitulo' onClick={renderCardFonts}>MISS??O</div>
				<span className='textoCard' onClick={renderCardFonts}>
					Promover o melhor desempenho do comercio atrav??s das tecnologias do mercado, 
					solucionando suas necessidades em informatiza????o primando pela ??tica e confiabilidade.
				</span>
			</Col>

			<Col xs={12} sm={6} lg={3} className={`text-dark m-2 rounded-4 p-4 fundoCard`}>
				<div className='text-center textoTitulo' onClick={renderCardFonts}>VIS??O</div>
				<span className='textoCard' onClick={renderCardFonts}>
					Ser refer??ncia na presta????o de servi??o em automa????o comercial atrav??s de parcerias s??lidas 
					com f??bricas de software e distribuidores de equipamentos.
				</span>
			</Col>

			<Col ref={empresa} xs={12} sm={6} lg={3} className={`text-dark m-2 rounded-4 p-4 fundoCard`}>            
				<div className='text-center textoTitulo' onClick={renderCardFonts}>VALORES</div>
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
		<div ref={produtosEmissor} className='d-flex justify-content-center mt-5 pt-1'>
			<div className='w-50 divisor'></div>
		</div>

		<Row className='d-flex justify-content-center m-2'>
			<Col xs={12} className='text-center m-4 pt-3 textoTitulo'><h1 onClick={renderCardFonts}>PRODUTOS</h1></Col>
			<Col xs={12} className='mb-4 pb-2 text-center'>
				<h4 className='textoTitulo' onClick={renderCardFonts}>SOFTWARE ECO SISTEMA EMISSOR FISCAL</h4>
			</Col>
			
			{/* IN??CIO CARROSSEL IMAGENS */}
			<Col xs={6} className='mb-4'>
				<CarrosselEmissorNF click={handleShowEmissorNF}/>
			</Col>

			<Modal show={showEmissorNF} onHide={handleCloseEmissorNF} centered dialogClassName='w90per'>
				<ModalCarrossel titulo='SOFTWARE ECO SISTEMA EMISSOR FISCAL'>
					<CarrosselEmissorNF />
				</ModalCarrossel>
			</Modal>

			{/* FIM CARROSSEL IMAGENS */}

			<Col xs={9} className='textoCard' onClick={renderCardFonts}>
				<p>Seja voc?? uma pequena empresa que necessita apenas de emitir Notas Fiscais  este ?? o software certo.</p>
				<p>Software preparado para emiss??o de documentos fiscais e completa gest??o da sua empresa com m??dulos de vendas, compras, estoque, log??stica, liga????o bancaria, plataforma online de vendas e muito mais.</p>
				<p>O Emissor Fiscal ?? um software com uma extensiva lista de funcionalidades e se voc?? necessita de um ERP completo para Gest??o ou um PDV para Automa????o, ele ?? certamente a solu????o.</p>
				<p>Fa??a uso de todos os benef??cios de tecnologia WEB sem comprometer os dados confidenciais de sua empresa. Ao contr??rio de muitos outros softwares, cujos os dados s??o mantidos em servidores externos que voc?? n??o controla, aqui voc?? ?? quem decide. Pode manter o software 100% em nuvem instalado em VPS ou apenas no seu computador local.</p>
				<p>E caso necessite, nosso suporte de ?? tecnicamente capacitado para oferecer o melhor suporte, de treinamento  e at?? ajustes de software para as suas necessidades especificas.</p>
				<p>Com constantes atualiza????es e melhoramentos o Emissor Fiscal garante sempre o melhor custo benef??cio oferendo lhe as melhores e mais recentes tend??ncias de mercado. Um software que cresce em funcionalidades e ajuda sua empresa a crescer financeiramente com aumentos performance e rentabilidade.</p>
				<p>Disponibilizamos tamb??m uma instala????o gr??tis  limitada ?? emiss??o de NF-e, NFC-e e CF-e/SAT. Esta vers??o pode ser utilizada sem custos para voc?? e com a garantia de que a qualquer momento pode fazer um Upgrade para vers??o completa com ajuda do nosso suporte.</p>
			</Col>
		</Row>

		<Row className='d-flex justify-content-center m-2'>
			<Col xs={12} className='text-center m-5 p-2 textoTitulo'><h1 onClick={renderCardFonts}>Caracter??sticas</h1></Col>
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
		<div ref={produtosPDV} className='d-flex justify-content-center mt-5 pt-1'>
			<div className='w-50 divisor'></div>
		</div>

		<Row className='d-flex justify-content-center m-2'>
			<Col xs={12} className=' m-5 p-3 text-center'>
				<h4 className='textoTitulo' onClick={renderCardFonts}>SOFTWARE ECO SISTEMA PDV WIN</h4>
			</Col>

			{/* IN??CIO CARROSSEL IMAGENS */}
			<Col xs={6} className='mb-4'>
				<CarrosselPDV click={handleShowPDV}/>
			</Col>

			<Modal show={showPDV} onHide={handleClosePDV} centered dialogClassName='w90per'>
				<ModalCarrossel titulo='SOFTWARE ECO SISTEMA PDV WIN'>
					<CarrosselPDV />
				</ModalCarrossel>
			</Modal>

			{/* FIM CARROSSEL IMAGENS */}

			<Col xs={9} className='textoCard' onClick={renderCardFonts}> 
				<p>Software sem limita????o no n??mero de documentos fiscais emitidos e ainda disponibilizamos upgrades para que possa manter o software compat??vel com as demandas da SEFAZ e o funcionando atualizado. </p>
				<p>Cumprindo com todas as disposi????es legais impostas pela SEFAZ, este software, permite a emiss??o de NFC-e ou CF-e+SAT. Se n??o est?? obrigado a emitir documentos fiscais, pode tamb??m utilizar este PDV apenas para gest??o e controle do seu comercio.</p>
				<p>Entre em contato agora mesmo e comece a fazer uso de um PDV completo por 30 dias Gr??tis. </p>
				<p>Suporte especializado para  lhe ajudar  e at?? mesmo um upgrade de software que potencie ainda mais as suas vendas.</p>
				<p>O software permite tamb??m criar Pedidos, Or??amentos e at?? mesmo emiss??o Notas Fiscais e com isto voc?? tem a possibilidade de emitir documentos no PDV e tamb??m na retaguarda.</p>
				<p>Disponibilizamos uma vers??o de teste completa  do software com muitas funcionalidades adicionais. </p>
			</Col>
		</Row>

		<Row className='d-flex justify-content-center m-2'>
			<Col xs={12} className='text-center m-5 p-2 textoTitulo'><h1 onClick={renderCardFonts}>Caracter??sticas</h1></Col>
			<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
				<ul onClick={renderCardFonts}>
					<li>Transparecia para com o cliente</li>
					<li>Listar produtos da venda</li>
					<li>Mostrar valor dos produtos</li>
					<li>Quantidades digitadas</li>
					<li>M??todo pagamento selecionado</li>
					<li>QR code de pagamento PIX</li>
					<li>Resumo da venda</li>
					<li>Evitar desvios no caixa</li>
					<li>Agilizar vendas</li>
					<li>Para Celular ou Tablet</li>
					<li>Todos os tamanhos de tela </li>
				</ul>
			</Col>
			<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
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

			<Col xs={12} sm={6} lg={3}  className={`m-2 rounded-4 p-4 fundoCard`}>
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

			<Col xs={12} sm={6} lg={3} className={`m-2 rounded-4 p-4 fundoCard`}>
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

    </Container>
    </>
  );
}

export default App;
