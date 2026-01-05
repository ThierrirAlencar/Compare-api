export enum welcomeType {
    login,
    singup
}

export const WELCOME_EMAIL=(userName, wel_type:welcomeType=welcomeType.login)=>{
    return `
                <!DOCTYPE html>
                    <html lang="pt-BR">
                    <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Recuperação de Senha</title>
                    <style>
                        body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f6f8;
                        margin: 0;
                        padding: 0;
                        color:1D1E1E
                        }
                        .container {
                        max-width: 600px;
                        margin: 30px auto;
                        background: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                        }
                        .header {
                        background-color: #7F1A17;
                        color: #ffffff;
                        padding: 20px;
                        text-align: center;
                        }
                        .content {
                        padding: 30px;
                        color: #333333;
                        font-size: 16px;
                        }
                        .button {
                        display: block;
                        width: fit-content;
                        margin: 30px auto;
                        padding: 12px 25px;
                        background-color: #7F1A17;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                        }
                        .footer {
                        font-size: 14px;
                        color: #888888;
                        text-align: center;
                        padding: 20px;
                        }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <div class="header">
                        <h1>Bem vindo à plataforma Compare!</h1>
                        </div>
                        <div class="content">
                        <p>Olá,<strong>${userName}</strong></p>
                        <p>Esté email realizou ${wel_type} na plataforma <a href="https://morimitsu.vercel.app/">Compare</a></p>
                        <p>Se não foi você quem solicitou essa operação na nossa aplicação usando este email, por favor entre em contato e solicite a remoção!</p>

                        <p>Atenciosamente,<br/>System91</p>
                        </div>
                        <div class="footer">
                            Este é um e-mail automático. Não responda diretamente a esta mensagem.
                        </div>
                    </div>
                    </body>
                    </html>

            `
}