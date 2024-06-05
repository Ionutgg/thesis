import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import Icon from '../logo/logo.png'; 

// se creeaza stiluri
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column', // se schimba coloana sa permita mai multe elemente una pe alta
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  invoiceDetails: {
    textAlign: 'right',
  },
  line: {
    borderBottom: 1,
    borderColor: 'black',
    marginBottom: 5,
    marginTop: 5,
  },
  sectionData: {
    fontSize: 12,
  },
  sectionEnd: {
    fontSize: 12,
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  productLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center', // se alinieaza obiectele vertical
  },
  productLabel: {
    fontWeight: 'bold',
  },
  productAmount: {
    flex: 1, // perrmite textului sa umple spatiul disponibil
    textAlign: 'center',
    marginLeft: 140,
  },
  productPrice: {
    textAlign: 'right',
    marginLeft: 120,
  },
  billTo: {
    marginLeft: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});

export const MyDocument = ({ products, client, date, endDate, id, address }) => {
  let total = 0; 

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header  */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image style={styles.logo} src={Icon} />
            <Text style={styles.companyName}>Company Name</Text>
          </View>
          <View style={styles.invoiceDetails}>
            <Text>Invoice #: {id}</Text>
            <Text>Created: {date}</Text>
            <Text>Due: {endDate}</Text>
          </View>
        </View>

        {/* Body  */}
        <View style={styles.section}>
          {/* Firma si Client */}
          <View style={styles.addressContainer}>
            <View style={styles.address}>
              <Text style={styles.sectionData}>Provider: S.C Name S.R.L</Text>
              <Text style={styles.sectionData}>Address: Street, City,</Text>
              <Text style={styles.sectionData}>Country, Zip Code</Text>
              <Text style={styles.sectionData}>Account: RO22TTRRONCZS00S02605010</Text>
              <Text style={styles.sectionEnd}>Bank: BRD-SMCC</Text>
            </View>
            <View style={styles.billTo}>
              <Text style={styles.sectionData}>Bill to: {client}</Text>
              <Text style={styles.sectionData}>Address: {address}</Text>
            </View>
          </View>
          {/* lista de produse */}
          <View style={styles.productLabels}>
            <Text>Products:</Text>
            <Text style={styles.productLabel}>Unit Price:</Text>
            <Text style={styles.productLabel}>Quantity:</Text>
            <Text style={styles.productLabel}>Price:</Text>
          </View>
          {products.map((product, index) => (
            product.amount !== '' && (
              <View key={index}>
                <View style={styles.line} />
                <View style={styles.productLabels}>
                  <Text>{product.title}</Text>
                  <Text style={styles.productPrice}>{product.price}</Text> {/* pret pe unitate */}
                  <Text style={styles.productAmount}>{product.amount}</Text>
                  <Text style={styles.productPrice}>{product.price * parseInt(product.amount)}</Text>
                </View>
                {/* pretul total pentru produs */}
                {total += product.price * parseInt(product.amount)}
              </View>
            )
          ))}

          <View style={styles.line} />
          
          {/* pretul total al facturii */}
          <Text style={[styles.productLabel, styles.productPrice]}>Total price: {total}</Text>
        </View>
      </Page>
    </Document>
  );
};
