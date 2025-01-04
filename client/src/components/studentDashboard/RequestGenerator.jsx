import Input from "../ui/Input.jsx";
import { useState } from "react";
import { generateRequestFileName } from "../../../lib/utils.jsx";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "80%",
    height: "auto",
  },
  content: {
    fontSize: 12,
    marginBottom: 15,
  },
  signature: {
    fontSize: 12,
    marginTop: 20,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
});

const RequestPDF = ({ student, professor, title }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.imageContainer}>
          <Image src="/CSIE.png" style={styles.image} />
        </View>
        <Text style={styles.content}>
          &nbsp; Subsemnatul/a {student.name}, student/a in anul {student.year} in
          cadrul facultatii de Cibernetica, Statistica si Informatica Economica,
          forma de invatamant IF, specializarea: {student.major}.
        </Text>
        <Text style={styles.content}>
          &nbsp; Va rog sa binevoiti a-mi aproba cererea pentru realizarea lucrarii de disertatie cu
          titlul: {title}, avand coordonator stiintific pe dl/dna {professor.name}.
        </Text>
        <Text style={styles.content}>
          Mentionez ca am fost inmatriculat/a in anul universitar 2020-2021.
        </Text>
        <Text style={styles.content}>
          Email: {student.email}
        </Text>
        <Text style={styles.signature}>
          Data ______________ Semnatura student.
        </Text>
        <Text style={styles.signature}>
          Data ______________ Semnatura coordonator stiintific.
        </Text>
        <Text style={styles.signature}>
          Domnul Decan al Facultatii de Cibernetica, Statistica si Informatica
          Economica.
        </Text>
      </Page>
    </Document>
  );
};

const RequestGenerator = ({ student, professor }) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Generate Request</h2>
      <Input
        type="text"
        placeholder="Enter thesis title here"
        onChange={handleTitleChange}
        className="w-full p-2 mb-4 bg-gray-600 text-white rounded"
      />
      <PDFDownloadLink
        document={
          <RequestPDF student={student} professor={professor} title={title} />
        }
        fileName={generateRequestFileName(student, professor)}
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold w-full py-2 rounded-lg text-center"
      >
        {({ loading }) =>
          loading ? "Loading Document..." : "Generate Request"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default RequestGenerator;