import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function App() {
  // Get device width & height for responsiveness
  const { width, height } = Dimensions.get('window');

  // State variables
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const [remember, setRemember] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // References for each OTP input box
  const otpRefs = useRef([]);

  // Countdown for resend
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const isMobileValid = mobileNumber.length === 10;
  const isOtpComplete = otp.every((digit) => digit !== '');

  /**
   * Handle OTP input change
   */
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next box if digit entered
    if (text && index < otp.length - 1) {
      otpRefs.current[index + 1].focus();
    }

    // Move to previous box if deleting and not first box
    if (!text && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  /**
   * Handle key press inside OTP box
   */
  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setResendTimer(30);
  };

  const handleResendOtp = () => {
    setResendTimer(30);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Logo */}
        <Image
          source={require('./source/image/UPSClogo.jpg')}
          style={styles.logo}
        />

        {/* Title */}
        <Text style={styles.title}>
          <Text style={styles.orange}>UPSC</Text>
          <Text style={styles.blue}> Prep</Text>
        </Text>

        {/* Welcome text */}
        <Text style={styles.welcome}>Welcome UPSC Aspirant</Text>
        <Text style={styles.subtitle}>Start your journey to serve the nation</Text>

        {/* Mobile Input */}
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.mobileInputContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.countryCode}>+91</Text>
          </View>
          <TextInput
            style={styles.mobileInput}
            placeholder="Enter your mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>

        {/* OTP Input */}
        <Text style={styles.label}>Enter OTP</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpRefs.current[index] = ref)}
              style={styles.otpBox}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        {/* Resend timer */}
        {otpSent && resendTimer > 0 && (
          <Text style={styles.resend}>
            Resend OTP in <Text style={styles.timer}>{resendTimer}s</Text>
          </Text>
        )}

        {/* Remember device */}
        <View style={styles.checkboxContainer}>
          <CheckBox value={remember} onValueChange={setRemember} />
          <Text style={styles.checkboxLabel}>Remember this device</Text>
        </View>

        {/* Send/Resend OTP Button */}
        {!otpSent ? (
          <TouchableOpacity
            style={[
              styles.sendOtpBtn,
              { backgroundColor: isMobileValid ? '#1E90FF' : '#cfc8c8ff' }
            ]}
            disabled={!isMobileValid}
            onPress={handleSendOtp}
          >
            <Text style={styles.sendOtpText}>Send OTP</Text>
          </TouchableOpacity>
        ) : resendTimer === 0 ? (
          <TouchableOpacity
            style={[styles.sendOtpBtn, { backgroundColor: '#1E90FF' }]}
            onPress={handleResendOtp}
          >
            <Text style={styles.sendOtpText}>Resend OTP</Text>
          </TouchableOpacity>
        ) : null}

        {/* Login button */}
        <TouchableOpacity
          style={[ styles.loginBtn,{ backgroundColor: isOtpComplete ? '#1E90FF' : '#cfc8c8ff' }]}
          disabled={!isOtpComplete} // onPress={() => navigation.navigate('Home')}
          >
          <Text style={styles.loginText}>Login</Text>
          
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { alignItems: 'center', padding: 20 },
  logo: { width: 100, height: 150, marginBottom: 0, marginTop: 20 },
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 5 },
  orange: { color: 'orange' },
  blue: { color: '#4169E1' },
  welcome: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 20 },
  label: { alignSelf: 'flex-start', marginTop: 10, fontWeight: '600' },

  /* Mobile input */
  mobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
    overflow: 'hidden',
  },
  countryCodeContainer: {
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#aaa',
    width: 50,
  },
  countryCode: {
    fontWeight: '600',
    fontSize: 16,
    color: '#555',
    height: 38,
    textAlignVertical: 'center',
  },
  mobileInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
  },

  /* OTP input */
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  otpBox: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    width: 45,
    height: 50,
    textAlign: 'center',
    fontSize: 18,
  },
  resend: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    alignItems: 'center',
  },
  timer: { color: 'orange', fontWeight: 'bold' },

  /* Checkbox */
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  checkboxLabel: { marginLeft: 8 },

  /* Buttons */
  loginBtn: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    bottom: 20,
    borderColor: '#000',
    borderWidth: 0.5,
  },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  sendOtpBtn: {
    borderWidth: 0.5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    position: 'relative',
    bottom: 20,
    borderColor: '#000',
  },
  sendOtpText: { fontWeight: '600', color: '#fff' },

  /* Footer */
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 20,
    position: 'relative',
    bottom: 20,
  },
  link: { color: '#007AFF', fontWeight: '500' },
});
