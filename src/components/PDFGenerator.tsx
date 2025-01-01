import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer';
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { Mois, type User } from '../types';
import { generateTableData, MoisArray } from '../utils/tableau';
import { styles } from '../utils/style';

// Enregistrer la police
Font.register({
  family: 'Poppins',
  src: '/assets/fonts/Poppins-Regular.ttf',
});

interface PDFDocumentProps {
  user: User;
}

export function PDFDocument({ user }: PDFDocumentProps) {

  const moisArray = Object.keys(Mois).filter((key) => isNaN(Number(key))); // En-têtes des mois

  const m = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juiellet", "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",]

  const table = generateTableData(user);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: "60px" }}>
          {user.logo && <Image src={user.logo} style={{ width: "100px" }} />}
        </View>
        <View style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 22, marginBottom: 40, fontFamily: "Helvetica-Bold", }}>
            ATTESTATION DE MISE EN CONGE
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: "14px" }}>Monsieur {user.nom}, </Text>
        </View>

        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: "14px", marginTop: 50 }}>
            nous vous informons que vous etes en conge
            du {new Date(user.debutConge).toLocaleDateString()} au {new Date(user.finConge).toLocaleDateString()}
          </Text>
        </View>

        {/* Render the table */}
        <Table style={{ fontSize: 10 }}>

          <TH>
            <TD>
              Tâche
            </TD>

            {m.map((mois, index) => (
              <TD>
                <TR key={index}>
                  <TD>
                    {mois}
                  </TD>
                </TR>
              </TD>
            ))}
          </TH>

          {user.salaires.map((task, index) => {
            // Initialize row with task name
            const row = m.map((mois) => {
              // Find the salary for the current task and month
              const salaire = user.salaires.find((s) => s.mois === mois && s.tache === task.tache);
              return salaire ? salaire.montant : 0; // Display 0 if no salary is found for that month
            });

            return (
              <TR key={index}>
                <TD>{task.tache}</TD>
                {row.map((montant, idx) => (
                  <TD key={idx}>{montant === 0 ? '0 €' : `${montant} €`}</TD>
                ))}
              </TR>
            );
          })}
        </Table>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 14 }}>Fait a {new Date(user?.dateAjout).toLocaleDateString()}</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.subtitle}>Signature : {user.signature && <Image src={user.signature} style={{ width: 200 }} />}</Text>
        </View>

      </Page>
    </Document>
  );
}