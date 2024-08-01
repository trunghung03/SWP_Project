import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Define the styles for the PDF document
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "black",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'left',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 8,
    fontSize: 12,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#e0e0e0',
    textAlign: 'center',
  },
  tableHeaderCell: {
    backgroundColor: "#2176AE",
    color: "white",
    fontWeight: 'bold',
    textAlign: 'center',
  },
  columnId: {
    width: '10%',
  },
  columnCode: {
    width: '20%',
  },
  columnName: {
    width: '30%',
  },
  columnPrice: {
    width: '20%',
  },
  columnStock: {
    width: '20%',
  },
  viewer: {
    width: window.innerWidth, // the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

const ProductPDF = ({ products }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>List of Products</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnId]}>ID</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnCode]}>Code</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnName]}>Name</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnPrice]}>Price</Text>
            <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock]}>Stock</Text>
          </View>
          {products.map((product) => (
            <View style={styles.tableRow} key={product.productId}>
              <Text style={[styles.tableCell, styles.columnId]}>{product.productId}</Text>
              <Text style={[styles.tableCell, styles.columnCode]}>{product.productCode}</Text>
              <Text style={[styles.tableCell, styles.columnName]}>{product.name}</Text>
              <Text style={[styles.tableCell, styles.columnPrice]}>{product.price}</Text>
              <Text style={[styles.tableCell, styles.columnStock]}>{product.maxProductAvailable}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default ProductPDF;
