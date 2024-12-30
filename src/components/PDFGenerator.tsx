import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { Utilisateur } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  signature: {
    marginTop: 30,
  },
});

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

interface PDFDocumentProps {
  user: Utilisateur;
}

export function PDFDocument({ user }: PDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Fiche de salaire - {user.nom} {user.prenom}</Text>
          <Text style={styles.subtitle}>
            Période de congé : {new Date(user.debutConge).toLocaleDateString()} - {new Date(user.finConge).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={[styles.tableCell, { width: '20%' }]}>
              <Text>Tâche</Text>
            </View>
            {months.map((month) => (
              <View key={month} style={[styles.tableCell, { width: '6.66%' }]}>
                <Text>{month.substring(0, 3)}</Text>
              </View>
            ))}
          </View>

          {user.salaires.map((salaire, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={[styles.tableCell, { width: '20%' }]}>
                <Text>{salaire.tache}</Text>
              </View>
              {salaire.montants.map((montant, idx) => (
                <View key={idx} style={[styles.tableCell, { width: '6.66%' }]}>
                  <Text>{montant}€</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {user.signature && (
          <View style={styles.signature}>
            <Text style={styles.subtitle}>Signature :</Text>
            <Image src={user.signature} style={{ width: 200 }} />
          </View>
        )}
      </Page>
    </Document>
  );
}