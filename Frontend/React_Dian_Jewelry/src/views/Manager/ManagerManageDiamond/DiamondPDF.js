import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import React from 'react';

// Define the styles for the PDF document
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff", color: "black", padding: 30,
    }, section: {
        margin: 10, padding: 10,
    }, header: {
        fontSize: 24, marginBottom: 20, textAlign: 'left',
    }, table: {
        display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderColor: '#e0e0e0', marginBottom: 20,
    }, tableRow: {
        flexDirection: "row",
    }, tableCell: {
        padding: 8, fontSize: 12, borderStyle: "solid", borderWidth: 1, borderColor: '#e0e0e0', textAlign: 'center',
    }, tableHeaderCell: {
        backgroundColor: "#2176AE", color: "white", fontWeight: 'bold', textAlign: 'center',
    }, columnId: {
        width: '10%',
    }, columnCode: {
        width: '20%',
    }, columnName: {
        width: '30%',
    }, columnPrice: {
        width: '20%',
    }, columnStock: {
        width: '20%',
    }, viewer: {
        width: window.innerWidth, // the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
});

const DiamondPDF = ({main, subs}) => (<Document>
        <Page style={styles.page}>
            {main && <View style={styles.section}>
                <Text style={styles.header}>List of Main Diamonds</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnId]}>ID</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnId]}>Attr ID</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnCode]}>Shape</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnName]}>Color</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnPrice]}>Clarity</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock]}>Cut</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock]}>Carat</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock]}>Price</Text>
                        <Text
                            style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock, styles.width = '100%']}>Status</Text>
                    </View>
                    {main?.map((main) => (<View style={styles.tableRow} key={main.diamondAttributeId}>
                            <Text style={[styles.tableCell, styles.columnId]}>{main.diamondId}</Text>
                            <Text style={[styles.tableCell, styles.columnId]}>{main.diamondAttributeId}</Text>
                            <Text style={[styles.tableCell, styles.columnCode]}>{main.shape}</Text>
                            <Text style={[styles.tableCell, styles.columnName]}>{main.color}</Text>
                            <Text style={[styles.tableCell, styles.columnPrice]}>{main.clarity}</Text>
                            <Text style={[styles.tableCell, styles.columnStock]}>{main.cut}</Text>
                            <Text style={[styles.tableCell, styles.columnStock]}>{main.carat}</Text>
                            <Text style={[styles.tableCell, styles.columnStock]}>{main.price}</Text>
                            <Text style={[styles.tableCell, styles.columnStock]}>
                                {main.status ? 'Ready' : 'Sold'}
                            </Text>
                        </View>))}
                </View>
            </View>}

            {subs && <View style={styles.section}>
                <Text style={styles.header}>List of Sub Diamonds</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnId]}>ID</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnCode]}>Shape</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnName]}>Color</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnPrice]}>Clarity</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock]}>Cut</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock]}>Carat</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock]}>Price</Text>
                        <Text style={[styles.tableCell, styles.tableHeaderCell, styles.columnStock]}>Quantity</Text>
                    </View>
                    {subs?.map((sub) => (<View style={styles.tableRow} key={sub.subDiamondId}>
                            <Text style={[styles.tableCell, styles.columnId]}>{sub.subDiamondId}</Text>
                            <Text style={[styles.tableCell, styles.columnCode]}>{sub.shape}</Text>
                            <Text style={[styles.tableCell, styles.columnName]}>{sub.color}</Text>
                            <Text style={[styles.tableCell, styles.columnPrice]}>{sub.clarity}</Text>
                            <Text style={[styles.tableCell, styles.columnStock]}>{sub.cut}</Text>
                            <Text style={[styles.tableCell, styles.columnStock]}>{sub.carat}</Text>
                            <Text style={[styles.tableCell, styles.columnStock]}>{sub.price}</Text>
                            <Text style={[styles.tableCell, styles.columnStock]}>{sub.amountAvailable}</Text>
                        </View>))}
                </View>
            </View>}
        </Page>
    </Document>);

export default DiamondPDF;
