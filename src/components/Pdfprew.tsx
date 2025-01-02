import React from "react";
import { MoisArray, User } from "../types";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

interface PDFDocumentProps {
    user: User;
}
export default function Pdfprew({ user, }: PDFDocumentProps) {

    const printRef = React.useRef(null);

    const handleDownload = async () => {
        const element = printRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2,
        });
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
            margin:20
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 20, 10, pdfWidth, pdfHeight);
        pdf.save(`${user.nom}.pdf`);
    };

    return (
       
            <div ref={printRef} className="flex flex-col gap-7 mx-auto w-full m-8 relative text-[16px]">
                <div className="mt-6 flex justify-end absolute bottom-0 right-1" data-html2canvas-ignore>
                    <button
                        onClick={handleDownload}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Download size={20} />
                        Télécharger le PDF
                    </button>
                </div>
                <div className="justify-start mb-6">
                  {user.logo && <img src={user.logo} style={{ width: "120px" }} alt="logo" />}
                </div>
                <div className="flex justify-center font-semibold text-xl">
                    ATTESTATION DE MISE EN CONGE
                </div>
                <div className="flex gap-3"> Monsieur <p className="text-gray-900 font-extrabold">{user.nom},</p>  </div>
                <div className="text-lg font-semibold flex gap-2">  nous vous informons que vous etes en conge
                    du  <p className="font-bold">{new Date(user.debutConge).toLocaleDateString()}</p>  au <p className="font-bold">{new Date(user.finConge).toLocaleDateString()}</p> </div>
                <p>le Tableau reacapitulatif sur le solde de vos conge est le suivant</p>
                <div className=" underline text-lg font-bold">
                    Tableau de  {user?.tableau} :
                </div>
                {/* Tableau */}
                <table
                    style={{
                        width: "90%",
                        textAlign: "center",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        padding: "10px 0",
                        fontSize: 15,
                        margin: "20px 0"
                    }}
                >
                    <thead>
                        <tr style={{
                            borderCollapse: "collapse",
                            border: "1px solid black",
                        }}>
                            <th className="bg-gray-100">Tâche</th>
                            {MoisArray.map((mois, index) => (
                                <th key={index} style={{
                                    borderCollapse: "collapse",
                                    border: "1px solid black",
                                }}
                                
                                className="bg-gray-100">{mois}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {user.salaires.map((salaire, index) => {
                            const row = MoisArray.map((mois) => {
                                const dataMois = salaire.montant_par_moi.find((m) => m.mois === mois);
                                return dataMois ? dataMois.montant : 0;
                            });

                            return (
                                <tr key={index} style={{
                                    borderCollapse: "collapse",
                                    border: "1px solid black",
                                }}>
                                    <td style={{
                                        borderCollapse: "collapse",
                                        border: "1px solid black",
                                    }}>{salaire.tache}</td>
                                    {row.map((montant, idx) => (
                                        <td key={idx} style={{
                                            borderCollapse: "collapse",
                                            border: "1px solid black",
                                            fontSize:12
                                        }} >{montant} €</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="mt-3">
                    Fait a {user.lieu}
                </div>

                <p>Signature : {user.signature && <img src={user.signature} style={{ width: 100 }} alt="signature" />}
                    { }
                </p>

            </div>
      
    )
}
