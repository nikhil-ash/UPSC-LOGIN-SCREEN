import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
const { width, height } = Dimensions.get("window");
const categories = [
  { name: "Polity & Governance", image: require("./source/image/GS2Assets/Polity_Governance.jpg"), },
  { name: "Economy & Finance", image: require("./source/image/GS2Assets/Economy_Finance.jpg") },
  { name: "Science & Technology", image: require("./source/image/GS2Assets/Science_Technology.jpg") },
  { name: "Environment & Ecology", image: require("./source/image/GS2Assets/Environment_Ecology.jpg") },
  { name: "International Relations", image: require("./source/image/GS2Assets/International_Relations.jpg") },
  { name: "Social Development", image: require("./source/image/GS2Assets/Social_Development.jpg") },
];
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f0ff", paddingTop: height * 0.06 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => alert("Back Clicked Waiting for implementation")}>
            <Image
              source={require("./source/image/GS2Assets/arrow-back1.png")}
              style={styles.icons}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>BODHA UPSC</Text>
          <TouchableOpacity onPress={() => alert("Profile Clicked Waiting for implementation")}>
            <Image source={require("./source/image/GS2Assets/profile.png")} style={styles.icons}/>
          </TouchableOpacity>
        </View>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Image source={require("./source/image/GS2Assets/search.jpg")} style={styles.icons}/>
          <TextInput
            placeholder="Search for departments....."
            placeholderTextColor="#888"
            style={styles.searchInput}
            keyboardType="default"
          />
        </View>
        {/* Categories (with scroll) */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} style={styles.card} 
                onPress={() => alert(`Opening: ${item.name}`)}>
                <Image source={item.image} style={styles.cardImage}  />
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
          <Image source={require("./source/image/GS2Assets/home.png")} style={[styles.footer, { backgroundColor: '#fff' }]} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
          <Image source={require("./source/image/GS2Assets/contactus.png")} style={[styles.footer, { backgroundColor: '#fff' }]} />
            <Text style={styles.navText}>Contact us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
          <Image source={require("./source/image/GS2Assets/aboutus.png")} style={[styles.footer, { backgroundColor: '#fff' }]} />
            <Text style={styles.navText}>About us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
          <Image source={require("./source/image/GS2Assets/chat.png")} style={[styles.footer, { backgroundColor: '#fff' }]} />
            <Text style={styles.navText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f0ff" },
  footer: {
    width: 60,
    height: 60,
    resizeMode: "contain",},
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.04,
    height: height * 0.08, // responsive height
    backgroundColor: "#fff",
    elevation: 3,
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#000",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: width * 0.04,
    paddingHorizontal: width * 0.03,
    borderRadius: 25,
    elevation: 2,
    height: height * 0.06, // responsive height
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: width * 0.04,
    color: "#000",
  },
  scrollContent: {
    paddingHorizontal: width * 0.02,
    paddingBottom: height * 0.15, // ensures bottom space for scrolling
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    width: width / 2.2, 
    borderRadius: 12,
    marginVertical: height * 0.015,
    alignItems: "center",
    padding: width * 0.04,
    elevation: 3,
  },
  cardImage: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: "contain",
  },
  cardText: {
    marginTop: 8,
    fontSize: width * 0.035,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: height * 0.015,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    bottom: 0,
    width: "100%",
  },
  navItem: { alignItems: "center" },
  navText: {
    fontSize: width * 0.03,
    color: "#000",
    fontWeight : 'bold',
    marginTop: 2,
  },
  icons: {
    width :40,
    height: 40,
    resizeMode: "contain",
  },
});