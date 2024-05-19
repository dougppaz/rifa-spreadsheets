# rifa-spreadsheets

Faça rifas online com pagamento por Pix utilizando apenas HTML, CSS e Javascript no frontend e o Apps Script + Spreadsheets da Google como backend e base de dados.

Exemplo [rifa.dgls.me](https://rifa.dgls.me/)

![Rifa Online](.docs/rifa-online.png)

## Criando a planilha

1. Faça uma cópia da [Planilha Modelo](https://docs.google.com/spreadsheets/d/1vCIjy1IrF_TBOVOHDrC8PXC-K1ncTfg_JGLt2GDCi4o/edit?usp=sharing) para a sua conta Google.

   ![Cópia da Planilha Modelo](.docs/01-fazer-copia.png)
   Atenção: O **Arquivo do Apps Script anexado** deve ser copiado junto...

   ![Copiar documento](.docs/02-copiar-documento.png)

1. Configure sua rifa de acordo com a suas necessidades na planilha da rifa.

   ![Configure editando a planilha](.docs/03-edite.png)

## Crie a página da rifa

Para fazer o **build** da página da sua rifa você precisa gerar uma URL implementanto um App da Web no Apps Script do Google.

1. Vá até **Extensões > Apps Script**

   ![Abra o Apps Script](.docs/04-abra-o-apps-script.png)

1. Implemente um App da Web

   ![Nova implementação](.docs/05-nova-implementacao.png)

   Mantenha marcado apenas **App da web**.

   ![Implemente App da Web](.docs/06-implemente-app-da-web.png)

   Atenção: Em **Quem pode acessar** selecione **Qualquer pessoa**.

   ![Formulário de implementação](.docs/07-implemente-form.png)

   Clique em **Implementar** e autorize a aplicação.

   Possivelmente o Google irá te pedir para verificar essa aplicação **unsafe**, basta clicar em **Advanced** e em seguida **Go to rifa-spreadsheets (unsafe)**.
   ![Autorize unsafe](.docs/08-autorize-unsafe.png)

1. Copie a **URL** do **App na Web**

   ![URL do App na Web](.docs/09-url-app-da-web.png)

1. Faça o build da app passando a variável de ambiente `SCRIPT_GOOGLE_URL` com a **URL** do **App na Web**

   ```sh
   $ export SCRIPT_GOOGLE_URL='[URL do App na Web]'
   $ npm run build
   ```

1. Faça o deploy na sua CDN de preferência com os arquivos de output em `dist/`.

## Habilitando integração com o Mercado Pago

Requisitos:

- Ter um conta no Mercado Pago
- Ter pelo menos uma chave Pix cadastrada na conta

1. [Crie uma aplicação](https://www.mercadopago.com.br/developers/panel/app/create-app) em [Mercado Pago Developers](https://www.mercadopago.com.br/developers/pt)

   Configure da seguinte forma:

   - **Qual tipo de solução de pagamento você vai integrar?** Pagamentos on-line
   - **Você está usando uma plataforma de e-commerce?** Não
   - **Qual produto você está integrando?** CheckoutTransparente

1. Na sua planilha, na aba de configurações.

   - Altere o valor da linha 10, coluna B para `mp`
   - Adicione o Access Token da sua aplicação na linha 10, coluna C
