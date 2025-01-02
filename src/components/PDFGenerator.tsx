import { Document, Page, Text, View, Image, Font } from '@react-pdf/renderer';
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import {type User ,MoisArray} from '../types';
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

 // const moisArray = Object.keys(Mois).filter((key) => isNaN(Number(key))); // En-têtes des mois


  // const table = generateTableData(user);

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

{ /********************** * Render the table ********************************************************************/}
        <Table style={{ width: "100%", textAlign: "center", border: "1px solid #ccc" }}>
      <TR>
        <TH>Tâche</TH>
        {MoisArray.map((mois, index) => (
          <TH key={index}>{mois}</TH>
        ))}
      </TR>
      {user.salaires.map((salaire, index) => {
        const row = MoisArray.map((mois) => {
          const dataMois = salaire.montant_par_moi.find((m) => m.mois === mois);
          return dataMois ? dataMois.montant : 0;
        });

        return (
          <TR key={index}>
            <TD>{salaire.tache}</TD>
            {row.map((montant, idx) => (
              <TD key={idx}>{montant} €</TD>
            ))}
          </TR>
        );
      })}
    </Table>
{ /********************** * Render the table ********************************************************************/}


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