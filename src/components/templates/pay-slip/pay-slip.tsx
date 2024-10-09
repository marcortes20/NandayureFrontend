'use client';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Document,
  Page,
  PDFViewer,
} from '@react-pdf/renderer';
import { notFound } from 'next/navigation';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import logo from '@/assets/logoNanda.jpg';
import { useGetPaySlipTemplate } from '@/hooks';

// Componente para las líneas horizontales
interface HorizontalLineProps {
  width: string;
  spaceWidth: string;
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({ width, spaceWidth }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View
      style={{
        ...styles.horizontalLine,
        width: width,
        borderBottomColor: '#4caf50',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLine,
        width: width,
        borderBottomColor: '#e4df5e',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLine,
        width: width,
        borderBottomColor: '#2196f3',
      }}
    />
  </View>
);

const HorizontalLineFooter: React.FC<HorizontalLineProps> = ({ width, spaceWidth }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
    <View
      style={{
        ...styles.horizontalLineFooter,
        width: width,
        borderBottomColor: '#4caf50',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLineFooter,
        width: width,
        borderBottomColor: '#e4df5e',
      }}
    />
    <View style={{ width: spaceWidth }} />
    <View
      style={{
        ...styles.horizontalLineFooter,
        width: width,
        borderBottomColor: '#2196f3',
      }}
    />
  </View>
);

interface PaySlipProps {
  employeeId: number; // Añadir employeeId como propiedad esperada del componente
}

const PaySlip: React.FC<PaySlipProps> = ({ employeeId }) => {
  // Integración del hook `useGetPaySlipTemplate` con employeeId
  const { employee, overTime, annuities, jobPosition, isLoading, isError } =
    useGetPaySlipTemplate({ employeeId });

  // Verificar si los datos se están cargando
  if (isLoading) {
    return <SkeletonLoader className="w-full h-screen" />;
  }

  // Verificar si hay un error al obtener los datos o si los datos no existen
  if (isError || !employee || !jobPosition) {
    return notFound();
  }

  return (
    <div>
      <PDFViewer width="100%" height="600">
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
              <Image style={styles.logo} src={logo.src} />
              <View style={styles.tituloContainer}>
                <Text style={styles.titulo}>Municipalidad de Nandayure</Text>
                <Text style={styles.subtitulo}>Boleta de Pago</Text>
              </View>
            </View>

            <HorizontalLine width="100%" spaceWidth="0%" />

            {/* Datos del funcionario */}
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Nombre del Funcionario:</Text>
              <Text style={styles.fieldValue}>{Person.Name}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Puesto:</Text>
              <Text style={styles.fieldValue}>{jobPosition.Name}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.fieldLabel}>Categoría de Puesto:</Text>
              <Text style={styles.fieldValue}>{jobPosition.DepartmentId}</Text>
            </View>

            {/* Tabla de salarios */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableColHeaderSalario}>Salario base</Text>
                <Text style={styles.tableColHeaderSalario}>Anualidades</Text>
                <Text style={styles.tableColHeaderSalario}>Horas Extras</Text>
                <Text style={styles.tableColHeaderSalario}>Dedicación</Text>
                <Text style={styles.tableColHeaderSalario}>Prohibición</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableColSalario}>{jobPosition.baseSalary}</Text>
                <Text style={styles.tableColSalario}>{annuities?.Amount || 0}</Text>
                <Text style={styles.tableColSalario}>{overTime?.Hours || 0}</Text>
                <Text style={styles.tableColSalario}>{employee.dedication}</Text>
                <Text style={styles.tableColSalario}>{employee.prohibition}</Text>
              </View>
            </View>

            {/* Total devengado */}
            <View style={styles.devengadoSection}>
              <Text style={styles.tableColHeaderDevengado}>Total Devengado:</Text>
              <Text style={styles.tableColDevengado}>{employee.totalEarned}</Text>
            </View>

            {/* Deducciones y observaciones */}
            <View style={styles.contentWrapper}>
              <View style={styles.deduccion}>
                <Text style={styles.deducciontitulo}>Deducciones:</Text>
                <Text>Seguro (10,67%): {employee.deductions?.insurance || 0}</Text>
                <Text>Tributación: {employee.deductions?.tax || 0}</Text>
                <Text>Coopeservidores: {employee.deductions?.coopeservidores || 0}</Text>
                <Text>Coopealianza: {employee.deductions?.coopealianza || 0}</Text>
                <Text>Servicoop: {employee.deductions?.servicoop || 0}</Text>
                <Text>Coope-Ande: {employee.deductions?.coopeAnde || 0}</Text>
                <Text>ASEMUNA (5%): {employee.deductions?.asemuna || 0}</Text>
                <Text>Embargos: {employee.deductions?.embargos || 0}</Text>
                <Text>Pensión: {employee.deductions?.pension || 0}</Text>
                <Text>Funerales vida: {employee.deductions?.lifeFuneral || 0}</Text>
                <Text>SITRAMUNA: {employee.deductions?.sitramuna || 0}</Text>
                <Text>ANEP: {employee.deductions?.anep || 0}</Text>
                <Text>INS: {employee.deductions?.ins || 0}</Text>
                <Text>Total de Deducciones: {employee.totalDeductions || 0}</Text>
              </View>
              <View style={styles.observacion}>
                <Text style={styles.observaciontitulo}>Observaciones:</Text>
                <Text>{employee.observations || 'Ninguna'}</Text>
              </View>
            </View>

            {/* Neto a Pagar */}
            <View style={styles.devengadoSection}>
              <Text style={styles.tableColHeaderDevengado}>Neto a Pagar:</Text>
              <Text style={styles.tableColDevengado}>{employee.netPay}</Text>
            </View>

            <HorizontalLineFooter width="50%" spaceWidth="0%" />

            {/* Footer */}
            <View style={styles.footer}>
              <Text>Depto. Recursos Humanos</Text>
              <Text>Municipalidad de Nandayure</Text>
              <Text>Encargada: Licda. Yeilin Arias Rojas</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PaySlip;

// Estilos
const styles = StyleSheet.create({
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
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    borderRightWidth: 1,
    width: '50%',
    borderRightColor: '#000',
    paddingRight: 3,
  },
  fieldValue: {
    fontSize: 12,
    paddingLeft: 3,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    margin: '5px 0',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
    marginBottom: 3,
  },
  tableColHeaderSalario: {
    width: '50%',
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    textAlign: 'center',
  },
  tableColSalario: {
    width: '50%',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    textAlign: 'center',
  },
  devengadoSection: {
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 12,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 5,
  },
  deduccion: {
    width: '73%',
    border: '1px solid #000',
    padding: 5,
  },
  observacion: {
    width: '27%',
    padding: 5,
    border: '1px solid #000',
  },
  deducciontitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  observaciontitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 3,
  },
  tableColHeader: {
    width: '50%', // ajusta el tamaño según lo necesario
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', // centrado del texto
  },
  tableCol: {
    width: '50%', // ajusta el tamaño según lo necesario
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', // centrado del texto
  }, 
  tableColDevengado: {
    width: '50%', 
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', 
  },
  tableColHeaderDevengado: {
    width: '50%', 
    fontWeight: 'bold',
    fontSize: 12,
    borderRightWidth: 1,
    borderRightColor: '#000',
    padding: 3,
    wordBreak: 'break-word',
    textAlign: 'center', 
  },
  horizontalLine: {
    borderBottomWidth: 2,
    marginVertical: 0,
  },
  horizontalLineFooter: {
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: '#000',
    marginVertical: 5,
  },
});
