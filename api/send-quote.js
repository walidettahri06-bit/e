import { IncomingForm } from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Méthode non autorisée' });
    }

    const form = new IncomingForm();

    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Erreur lors du traitement du formulaire' });
                return resolve();
            }

            // Extract fields (formidable returns arrays in v3+)
            const getFirst = (val) => (Array.isArray(val) ? val[0] : val);

            const activeTab = getFirst(fields.activeTab);
            const name = getFirst(fields.name);
            const phone = getFirst(fields.phone);
            const email = getFirst(fields.email);
            const btpType = getFirst(fields.btpType);
            const btpSurface = getFirst(fields.btpSurface);
            const btpLocation = getFirst(fields.btpLocation);
            const ascEtages = getFirst(fields.ascEtages);
            const ascType = getFirst(fields.ascType);
            const ascService = getFirst(fields.ascService);

            let projectType = '';
            let projectDetails = '';

            if (activeTab === 'btp') {
                projectType = 'BTP & Construction';
                projectDetails = `Type de projet: ${btpType}\nSurface estimée: ${btpSurface} m²\nLocalisation: ${btpLocation}`;
            } else if (activeTab === 'ascenseurs') {
                projectType = 'Ascenseurs & Mobilité';
                projectDetails = `Nombre d'étages: ${ascEtages}\nType d'appareil: ${ascType}\nService demandé: ${ascService}`;
            }

            const emailBody = `
        <table style='width: 100%; max-width: 600px; border-collapse: collapse; font-family: Arial, sans-serif;'>
            <tr style='background-color: #f8f9fa;'>
                <td style='padding: 20px; text-align: center;'>
                    <h1 style='color: #1a5f4a; margin: 0;'>ESM - Nouvelle demande de devis</h1>
                </td>
            </tr>
            <tr>
                <td style='padding: 20px;'>
                    <table style='width: 100%; border-collapse: collapse;'>
                        <tr>
                            <td style='padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;'>Type de projet:</td>
                            <td style='padding: 10px 0; border-bottom: 1px solid #dee2e6; color: #1a5f4a;'>${projectType}</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;'>Nom du client:</td>
                            <td style='padding: 10px 0; border-bottom: 1px solid #dee2e6;'>${name}</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;'>Téléphone:</td>
                            <td style='padding: 10px 0; border-bottom: 1px solid #dee2e6;'>${phone}</td>
                        </tr>
                        <tr>
                            <td style='padding: 10px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;'>Email:</td>
                            <td style='padding: 10px 0; border-bottom: 1px solid #dee2e6;'>${email}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style='padding: 20px; background-color: #f8f9fa;'>
                    <h3 style='color: #1a5f4a; margin-top: 0;'>Détails du projet:</h3>
                    <pre style='font-family: Arial, sans-serif; white-space: pre-wrap; margin: 0;'>${projectDetails}</pre>
                </td>
            </tr>
            <tr>
                <td style='padding: 20px; text-align: center; color: #6c757d; font-size: 12px;'>
                    <p>Envoyé depuis le formulaire ESM - Elevators Sahara Morocco</p>
                </td>
            </tr>
        </table>`;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'elevatorssaharamrcco@gmail.com',
                    pass: 'hwvdouvajqjvdvhq', // Client App Password
                },
            });

            const mailOptions = {
                from: '"ESM - Devis" <elevatorssaharamrcco@gmail.com>',
                to: 'elevatorssaharamrcco@gmail.com',
                replyTo: email,
                subject: `[DEVIS ESM] Nouvelle demande - ${name}`,
                html: emailBody,
            };

            // Handle attachments
            if (files.attachment) {
                const attachment = Array.isArray(files.attachment) ? files.attachment[0] : files.attachment;
                mailOptions.attachments = [
                    {
                        filename: attachment.originalFilename,
                        path: attachment.filepath,
                    },
                ];
            }

            try {
                await transporter.sendMail(mailOptions);

                const whatsappMessage = `Bonjour ESM, j'ai envoyé un devis pour ${encodeURIComponent(projectType)} à ${encodeURIComponent((activeTab === 'btp') ? btpLocation : 'Maroc')}. Merci de me recontacter.`;
                const whatsappUrl = `https://wa.me/212651641379?text=${whatsappMessage}`;

                res.status(200).json({
                    success: true,
                    message: 'Merci, votre demande a été envoyée par email et WhatsApp !',
                    whatsappUrl
                });
                resolve();
            } catch (error) {
                console.error('Mail Error:', error);
                res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email' });
                resolve();
            }
        });
    });
}
