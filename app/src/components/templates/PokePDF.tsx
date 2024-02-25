import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { TPokemonDetails } from "../../types";

const PokePDF = ({ data }: { data: TPokemonDetails }) => {
  return data?.id ? (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{data.name.toUpperCase()}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} src={data.image} />
          </View>
          <View style={styles.abilitiesContainer}>
            <Text style={styles.abilitiesHeader}>Abilities:</Text>
            {data.abilities.map((ability, index) => (
              <Text key={index} style={styles.ability}>
                {ability}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  ) : null;
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  modalContainer: {
    width: "80%",
    maxWidth: 500,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    margin: 20,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
  },
  image: {
    width: 220,
    height: 220,
  },
  abilitiesContainer: {
    margin: 20,
  },
  abilitiesHeader: {
    fontSize: 18,
  },
  ability: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default PokePDF;
