import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  tituloContainer: {
    flex: 1,
    textAlign: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'justify',
    color: '#333333',
  },
   boldText: {
    fontWeight: 'bold',
    marginVertical: 5, 
    position: 'relative',
    top: -5, 
     color: '#00000',
  },
  containerCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  breakdownContainer: {
    width: '60%',
    fontSize: 12,
    border: '1pt solid black',
    padding: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottom: '1pt solid black',
  },
  lastRow: {
    borderBottom: 'none',
  },
  emptySpace: {
    height: 6,
    borderBottom: 'none',
  },
  signature: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  atentamente: {
    marginTop: 7,
    textAlign: 'center',
    fontSize: 12,
    color: '#333333',
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
  },
  personalID: {
    fontSize: 12,
    color: '#333333',
  },

  horizontalLine: {
    borderBottomWidth: 2,
    marginVertical: 0,
  

  },
  horizontalLine2: {
    borderBottomWidth: 10,
    marginVertical: 1,

  },
  space: {
    width: '1%',
  },
 footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 10,
    borderTop: '0.5pt solid',
    height: 80,
    flexDirection: 'column', 
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingTop: 10, 
    justifyContent: 'space-between', 
  },
  footerLeft: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  footerRightContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end', 
    marginTop: -50, 
  },
  footerRight: {
    textAlign: 'right',
    marginTop: 5,
  },
  
  
  horizontalLineFooter: {
    width: '100%', 
    borderBottomWidth: 5,
    borderBottomColor: '#000', 
    marginVertical: 5,
  },

  redBackground: {
    backgroundColor: '#f28b82', 
  },
  yellowBackground: {
    backgroundColor: '#fff475', 
  },
  
});