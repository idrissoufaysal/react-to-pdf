import { StyleSheet } from '@react-pdf/renderer';


export const styles = StyleSheet.create({
    page: {
      padding: 30,
      margin: 20,
      //fontFamily: 'Poppins',
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
    textBold: {
      fontFamily: "Helvetica-Bold",
    },
    table: {
        width: "100%",
        textAlign: "center",
        borderCollapse: "collapse",
        border: "1px solid black",
        padding: 5,
        fontSize: 15,
        borderRadius:8,
      margin: "20px 0",
    },
    tableHeader: {
      backgroundColor: "#e5e5e5",
    },
    td: {
      padding: 6,
      borderCollapse: "collapse",
      border:"1px solid black",
    },
    tr:{
        borderCollapse: "collapse",
        border:"1px solid black",
    },
    signature: {
      marginTop: 30,
    },
  });
  