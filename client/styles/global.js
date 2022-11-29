import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 50,
        paddingHorizontal: 50
    },
    titleText: {
        fontSize: 35,
        color: "#333",
        textAlign: "center",
        paddingTop: 50,
        paddingBottom: 30,
    },
    cardText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#333",
        textAlign: "left",
        paddingBottom: 15,
    },
    generalButton: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        backgroundColor: "#FA4A0C",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    generalButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    smallButton1: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: 30,
        backgroundColor: "#FA4A0C",
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallButtonText1: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    smallButton2: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: 20,
        backgroundColor: "#fff",
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallButtonText2: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FA4A0C",
        textAlign: "center",
    },
    bottomNavBar: {
        borderRadius: 6,
        height: 50,
        backgroundColor: "black",
        marginTop: 250,
    }
  });