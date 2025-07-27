import React from 'react';
import { 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView,
  StatusBar
} from 'react-native';
// import HTML from 'react-native-render-html';

// Get device dimensions
const { width, height } = Dimensions.get('window');

// Terms and conditions HTML content
const termsAndConditionsText = `
<p>Your use of this Application is subject to these Terms of Use. Use of this Application includes accessing, browsing or registering to use this Application and the sites of designated partners. By using this Application, you confirm that you have accepted and agreed to be bound by these Terms of Use. Accordingly, please read these Terms of Use carefully before you start using this Application. If you do not agree to these Terms of Use, you must not use this Application.</p>

<p>This Application is owned and operated by the Ministry of Digital Transformation. To contact us, including to raise any issues or complaints in relation to this Application and the services, please email at (IdenTT to be included here) or phone us at (IdenTT to be included here).</p>

<h2><b>Definitions</b></h2>

<p>In these Terms of Use, references to:</p>
<p><b>"designated partner"</b> shall mean any person, agency or organisation that has entered into in an agreement with the Ministry of Digital Transformation for the provision of a good or service.</p>
<p><b>"Us"</b>, <b>"We"</b> and <b>"This"</b> shall mean the Ministry of Digital Transformation;</p>
<p><b>"You"</b> and <b>"Your"</b> shall mean any person who accesses the Application;</p>
<p><b>"Application"</b> shall mean all and/or any of our or our designated partner's mobile applications and sites; and</p>
<p><b>"Service"</b> shall mean the relevant service provided by any of the relevant sites/mobile applications.</p>

<h2><b>Changes to these Terms of Use</b></h2>

<p>We may make changes to these Terms of Use from time to time. We may notify you of such changes by any reasonable means, including by posting the revised version of these Terms of Use on the Application.</p>

<p>We will use reasonable efforts to ensure that the Application is available at all times. However, we cannot guarantee that the Application or any individual function or feature of the Application will always be available and/or error free. In particular, the Application may be unavailable during periods when we are implementing upgrades to or carrying out essential maintenance on the Application.</p>

<h2><b>Accessing this Application</b></h2>

<p>All areas of this Application are made available at no monetary cost to you, the participant.</p>
<p>We do not guarantee that this Application, or any content on them, will always be available or be uninterrupted. Access to this Application is permitted on a temporary basis. We may suspend, withdraw or restrict the availability of all or any part of this Application for business and operational reasons. We will try to give you reasonable notice of any suspension or withdrawal by including a notice on the applicable Application. We will not be liable to you if for any reason this Application is unavailable or interrupted at any time or for any period.</p>

<p>We reserve the right to restrict your access to the Application or any part of it. Access to restricted areas of the Application may be subject to registration and other conditions. If we grant you permission to access a restricted area, we may withdraw that permission at any time (including where you breach any of these Terms of Use).</p>

<p>You are responsible for making all arrangements necessary for you to have access to this Application. You are also responsible for ensuring that all persons who access this Application through your internet connection are aware of these Terms of Use and other applicable terms and conditions, and that they comply with them.</p>

<h2><b>Your account and password</b></h2>

<p>If you choose, or you are provided with, a user identification code, password or any other piece of information as part of these security procedures, you must treat such information as confidential and personal to you. You must not disclose it to any third party nor use any third party's identification and security information to access this Application.</p>

<p>We have the right to disable any user identification code or password at any time, if in our reasonable opinion, you have failed to comply with any of the provisions of these Terms of Use. If you know or suspect that anyone, other than you, knows your user identification code or password, you must promptly notify us at communications@mdt.gov.tt.</p>

<h2><b>Intended use of this Application</b></h2>

<p>The Application is intended for use by persons who are duly registered and approved or otherwise authorized by the Ministry of Digital Transformation to access the content of designated partners for informational purposes only and any other user shall be known as an <b>Unauthorised User</b>. By using this Application, you are confirming that you are an Authorised User.</p>

<h2><b>Acceptable use of this Application</b></h2>

<p>You may use this Application only for lawful purposes. You may not use this Application:</p>

<ol>
    <li>in any way that breaches any applicable local, national or international law, regulation or code of practice;</li>
    <li>in any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect;</li>
    <li>in any way that infringes the rights of any third party (including intellectual property rights and rights to privacy); and/or</li>
    <li>to transmit, or procure the sending of, any unsolicited or unauthorised advertising or promotional material or any other form of similar solicitation to any person.</li>
</ol>

<p>You also agree not to reproduce, duplicate, copy or re-sell any part of this Application in contravention of these Terms of Use. This condition and the above prohibited uses constitute the "conditions of use" of this Application.</p>
<p>Breach of any of these conditions of use of this Application constitutes a material breach of these Terms of Use.</p>

<h2><b>Downloading items</b></h2>

<p>If you print off, copy or download any part of this Application in breach of these Terms of Use, your right to use this Application will cease immediately and you must destroy any copies of the material you have made.</p>

<h2><b>Viruses, hacking and other offences</b></h2>

<p>We do not guarantee that this Application will be secure or free from bugs or viruses.</p>
<p>Although we shall use reasonable efforts to ensure that this Application is free from viruses and other malicious or harmful content, you are responsible for configuring your information technology, computer programmes and platforms to access this Application. You should use your own virus protection software. It is recommended that you should virus check all materials downloaded from this Application and regularly check for the presence of errors, viruses, bugs, other malicious code, and harmful components.</p>

<p>You agree:</p>
<ol>
    <li>not to use this Application to knowingly transmit any data, send or upload any material that contains any viruses, Trojan horses, worms, logic or time bombs, keystroke loggers, spyware, adware or any other technologically harmful programs, data or code;</li>
    <li>not to attempt to access without authority, interfere with, damage or disrupt:
        <ul>
            <li>any part of this Application;</li>
            <li>any database connected to this Application;</li>
            <li>any equipment or network on which this Application is stored or which is connected to this Application; and/or</li>
            <li>any software used in the provision of this Application; and</li>
        </ul>
    </li>
    <li>not to attack this Application via a denial-of-service attack or a distributed denial-of service attack.</li>
</ol>

<p>By breaching this provision, you are liable for the commission of a criminal offence under the laws of the Republic of Trinidad and Tobago. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use this Application will cease immediately.</p>

<h2><b>Intellectual Property and how you may use material on this Application</b></h2>

<p>The trademarks, copyright, database rights and other intellectual property rights in the Application, and the information, text, pictures, videos, content, material or data that we display on the Application belong to the designated partner and all such rights are reserved.</p>
<p>Unless we explicitly state otherwise in writing, you may use, view, download, copy or print textual or graphic content of this Application provided that you do not change or delete any copyright, trademark or other proprietary notices on such content.</p>

<p>Under no circumstances may you use any content in a manner that may give a false or misleading impression of us or imply some form of commercial agency partnership or other arrangement between you and us.</p>
<p>Save for in accordance with these Terms of Use, you must not modify the paper or digital copies of any materials you have printed off or downloaded in any way, and you must not use any illustrations, photographs, video or audio sequences or any graphics separately from any accompanying text, without our prior and express written permission.</p>

<p>This status (and that of any identified contributors) as the authors of content on this Application must always be acknowledged.</p>
<p>You must not use any part of the content on this Application for commercial purposes without obtaining the prior and express written permission to do so from us or the designated partner.</p>
<p>If you print off, copy or download any part of this Application in breach of these Terms of Use, your right to use this Application will cease immediately and you must destroy any copies of the materials you have made.</p>

<h2><b>Do not rely on information on this Application</b></h2>

<p>The Ministry of Digital Transformation is not responsible for any information contained on this Application provided by the designated partner. The content on this Application is provided for general information only. It is not intended to amount to information or advice on which you should rely. You must obtain professional or specialist advice before taking, or refraining from, any action on the basis of the content on this Application.</p>
<p>There are no representations, warranties or guarantees, whether expressed or implied that the content on this Application is accurate, complete or up to date.</p>
<p>The Ministry of Digital Transformation facilitates the provision of the services with reasonable skill and care and endeavours to ensure that the databases and data we use in delivering the services are complete and accurate, however we cannot guarantee that your access to or use of the Application or services will be uninterrupted or error free.</p>

<h2><b>Limitation of Liability</b></h2>

<p>If you are an Unauthorised User:</p>
<p>We will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:</p>
<ol>
    <li>use of, or inability to use, the Application; or</li>
    <li>use of or reliance on any content displayed on the Application.</li>
</ol>

<p>In particular, we will not be liable for:</p>
<ol>
    <li>loss of profits, sales, business, or revenue;</li>
    <li>business interruption;</li>
    <li>loss of anticipated savings;</li>
    <li>loss of business opportunity, goodwill or reputation; or</li>
    <li>any indirect or consequential loss or damage.</li>
</ol>
<p>Please note that we only provide this Application for domestic and private use. You agree not to use the Application for any commercial or business purposes, and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.</p>

<h2><b>Access to the Application and login details</b></h2>

<p>You will have been provided with a password or registration code to access the Application.</p>

<p>You are responsible for the security and confidentiality of any usernames, passwords, registration code or other information needed to access or use the Application or any services. You must not allow others to access the Application or any services via your username or registration code.</p>

<p>You are only permitted to make five (5) attempts to log on to the services. Should you exceed these attempts your account may be suspended and you may be unable to use the Application. Should this happen please contact us at communications@mdt.gov.tt in order to request further access to the services.</p>

<p>Should you lose or misplace your access details you can notify us at communications@mdt.gov.tt.</p>

<h2><b>Personal Information</b></h2>

<p>Whenever you make use of services on this Application and input content and/or <b>Personal Information</b> (as defined by the Data Protection Act Chap. 22:04) you are confirming that you are either (a) the <b>Data Subject</b> or <b>Individual</b> (as defined by the Act), or, (b) have all necessary legal bases, consents and permissions to input such content and Personal Information. You warrant that any such input or contribution does comply with the requirements set out in this paragraph and you will be liable to us and indemnify us in full for any breach of this requirement. This means you will be responsible for any loss or damage we suffer as a result of your breach of warranty.</p>

<p>By using this Application, you are granting us permission to use any content and Personal Information provided for the purpose of the applicable service. Any content and/or Personal Information you input to this Application will be retained by us for a period of 6 months after either withdrawal of the participant from the programme or completion of the programme, as the case may be, so that we are able to assist and manage any complaints or claims which may arise in relation to the service. After this 6-month period, the Personal Information will be automatically deleted or kept on an anonymized or non-identifable basis for statistical purposes.</p>

<p>Any Personal Information obtained through use of cookies, tracking pixels, local shared object, HTMLS, LAN storage or other similar technologies shall be retained in accordance with the Data Protection Act.</p>

<p>Please note that in accordance with our data privacy policy, we have put in place appropriate security and technical measures to keep your Personal Information secure. We rely on your consent to process Personal Information for this service and this consent may be withdrawn at any time. For more information, please refer to our data privacy policy or the Data Protection Act.</p>

<h2><b>Applicable law</b></h2>

<p>These Terms of Use and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of Trinidad and Tobago.</p>

<p>You and we both agree that the courts of Trinidad and Tobago shall have exclusive jurisdiction over any dispute or claim arising from, or related to, use of this Application (including non-contractual disputes or claims).</p>

<h2><b>Limitation of Liability</b></h2>

<p>If you are an Unauthorised User:</p>
<p>We will not be liable to you for any loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:</p>
<ol>
    <li>use of, or inability to use, the Application; or</li>
    <li>use of or reliance on any content displayed on the Application.</li>
</ol>

<p>In particular, we will not be liable for:</p>
<ol>
    <li>loss of profits, sales, business, or revenue;</li>
    <li>business interruption;</li>
    <li>loss of anticipated savings;</li>
    <li>loss of business opportunity, goodwill or reputation; or</li>
    <li>any indirect or consequential loss or damage.</li>
</ol>

<p>Please note that we only provide this Application for domestic and private use. You agree not to use the Application for any commercial or business purposes, and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.</p>
<p>If you are a Permitted User:</p>

<p>We only provide the Application for domestic and private use. You agree not to use the Application for any commercial or business purposes, and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.</p>
<p>We only provide the Application for domestic and private use. You agree not to use the Application for any commercial or business purposes, and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.</p>

<p>We operate this Application as part of the services provided by our designated partners pursuant to an agreement with them and we are reliant on information, reports, documents and updates from such designated partners in this regard. Therefore, this Application is provided on an information only basis, without guarantee of such information, and we exclude all liability for losses arising out of your reliance on any information or documents accessed via this Application.</p>

<p>We exclude all liability for losses arising out of your reliance on the Application when there have been errors or inaccuracies in the information provided by you on the Application.</p>
`;

const TermsOfServiceScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => console.log('Back button pressed')}
      >
        <Image 
          source={require('../assets/images/Wave-2X.png')} 
          style={styles.backIcon} 
        />
      </TouchableOpacity>

      {/* ScrollView for content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.contentContainer}>
          {/* Logo/Image */}
          <Image
            source={require('../assets/images/Wave-2X.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <View style={styles.titleContainer}>
            <HTML 
              source={{ html: '<span style="font-family: poppins_bold; color: #285385; font-size: 24px; font-weight: bold;">Terms of Service</span>' }} 
              contentWidth={width - 32}
            />
          </View>

          {/* Description */}
          <View style={styles.htmlContainer}>
            <HTML
              source={{ html: termsAndConditionsText }}
              contentWidth={width - 32}
              tagsStyles={{
                p: styles.paragraphStyle,
                h2: styles.headingStyle,
                ol: styles.listStyle,
                ul: styles.listStyle,
                li: styles.listItemStyle,
                b: styles.boldStyle,
                br: styles.breakStyle
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    marginLeft: 14,
    marginTop: 14,
    padding: 6,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 16,
    width: width,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 16,
  },
  titleContainer: {
    marginTop: 24,
  },
  htmlContainer: {
    marginTop: 16,
  },
  paragraphStyle: {
    fontFamily: 'lato_regular',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.32,
    color: 'black',
    marginBottom: 8,
  },
  headingStyle: {
    fontFamily: 'poppins_semibold',
    fontSize: 20,
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  listStyle: {
    marginLeft: 16,
    marginBottom: 8,
  },
  listItemStyle: {
    fontFamily: 'lato_regular',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.32,
    color: 'black',
  },
  boldStyle: {
    fontWeight: 'bold',
  },
  breakStyle: {
    height: 16,
  }
});

export default TermsOfServiceScreen;