import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

export default function HelpScreen({ navigation }) {
  //section handler
  const [expandedSection, setExpandedSection] = useState('orders');

  const toggleSection = (id) => {
    setExpandedSection((current) => (current === id ? null : id));
  };

  // Write email to support
  const writeEmailSupport = async () => {
  const isAvailable = await MailComposer.isAvailableAsync();

  if (isAvailable) {
    const options = {
      recipients: ['ordersupport@gmail.com'],
      subject: 'Ordr Support',
      body: 'Hello!'
    };

    try {
      const result = await MailComposer.composeAsync(options);
      console.log(result.status);
    } catch (error) {
      console.log(error);
    }
  } else {
    Alert.alert('Error', 'Email is not available on this device');
  }
};


  return (
    <View style={styles.screen}>
      {/* Header */}
      <LinearGradient
        colors={['#6bd7efff', '#70e97aff']}
        style={styles.headerGradient}
      >

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <View style={{ width: 24 }} />
        </View>

      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* FAQ  */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>FAQ</Text>

          {/* Orders, Shipping */}
          <View style={styles.faqSection}>
            <TouchableOpacity
              style={styles.faqHeaderRow}
              onPress={() => toggleSection('orders')}
            >
              <View style={styles.faqHeaderLeft}>
                <Ionicons
                  name="file-tray-full-outline"
                  size={20}
                  color="#2563eb"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.faqHeaderText}>Orders and Shipping</Text>
              </View>
              <Ionicons
                name={
                  expandedSection === 'orders'
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={18}
                color="#6b7280"
              />
            </TouchableOpacity>

            {expandedSection === 'orders' && (
              <View style={styles.faqBody}>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    How can I track my order?
                  </Text>
                  <Text style={styles.answerText}>
                    You can track your order from the Order History section in
                    your Profile. Tap any order to see detailed tracking
                    information.
                  </Text>
                </View>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    What are the shipping options?
                  </Text>
                  <Text style={styles.answerText}>
                    We offer free standard shipping on all orders. Express
                    shipping is available for an additional fee.
                  </Text>
                </View>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    How long does shipping take?
                  </Text>
                  <Text style={styles.answerText}>
                    Standard shipping takes 3–5 business days. Express shipping
                    takes 1–2 business days.
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Returns & Refunds */}
          <View style={styles.faqSection}>
            <TouchableOpacity
              style={styles.faqHeaderRow}
              onPress={() => toggleSection('returns')}
            >
              <View style={styles.faqHeaderLeft}>
                <Ionicons
                  name="refresh-circle-outline"
                  size={20}
                  color="#2563eb"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.faqHeaderText}>Returns and Refunds</Text>
              </View>
              <Ionicons
                name={
                  expandedSection === 'returns'
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={18}
                color="#6b7280"
              />
            </TouchableOpacity>

            {expandedSection === 'returns' && (
              <View style={styles.faqBody}>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    What is your return policy?
                  </Text>
                  <Text style={styles.answerText}>
                    Most items can be returned within 30 days of delivery in
                    original condition and packaging.
                  </Text>
                </View>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    How do I start a return?
                  </Text>
                  <Text style={styles.answerText}>
                    Go to Order History, select your order, and choose the item
                    you want to return to see available options.
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Account & Profile */}
          <View style={styles.faqSection}>
            <TouchableOpacity
              style={styles.faqHeaderRow}
              onPress={() => toggleSection('account')}
            >
              <View style={styles.faqHeaderLeft}>
                <Ionicons
                  name="person-circle-outline"
                  size={20}
                  color="#2563eb"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.faqHeaderText}>Account and Profile</Text>
              </View>
              <Ionicons
                name={
                  expandedSection === 'account'
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={18}
                color="#6b7280"
              />
            </TouchableOpacity>

            {expandedSection === 'account' && (
              <View style={styles.faqBody}>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    How do I update my profile?
                  </Text>
                  <Text style={styles.answerText}>
                    Open the Profile tab and tap on the profile header to update
                    your name, photo, or email (if supported).
                  </Text>
                </View>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    Do I need an account to place an order?
                  </Text>
                  <Text style={styles.answerText}>
                    Yes, you need to create an account so we can save your
                    orders, addresses, and payment methods.
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Payment & Billing */}
          <View style={styles.faqSection}>
            <TouchableOpacity
              style={styles.faqHeaderRow}
              onPress={() => toggleSection('payments')}
            >
              <View style={styles.faqHeaderLeft}>
                <Ionicons
                  name="card-outline"
                  size={20}
                  color="#2563eb"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.faqHeaderText}>Payment and Billing</Text>
              </View>
              <Ionicons
                name={
                  expandedSection === 'payments'
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={18}
                color="#6b7280"
              />
            </TouchableOpacity>

            {expandedSection === 'payments' && (
              <View style={styles.faqBody}>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    What payment methods do you accept?
                  </Text>
                  <Text style={styles.answerText}>
                    We accept all major credit cards, PayPal, and Apple Pay
                    (depending on your region).
                  </Text>
                </View>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    Is my payment information secure?
                  </Text>
                  <Text style={styles.answerText}>
                    Yes, we use industry-standard encryption to protect your
                    payment information.
                  </Text>
                </View>
                <View style={styles.qaBlock}>
                  <Text style={styles.questionText}>
                    Can I save my payment methods?
                  </Text>
                  <Text style={styles.answerText}>
                    Yes, you can manage your saved payment methods from the
                    Profile &gt; Payment Methods screen.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* CONTACT US CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Us</Text>

          {/* Email Support */}
          <TouchableOpacity
            style={styles.contactRow}
            onPress={writeEmailSupport}
          >
            <View style={styles.contactLeft}>
              <View style={styles.contactIconCircle}>
                <Ionicons name="mail-outline" size={20} color="#2563eb" />
              </View>
              <View>
                <Text style={styles.contactTitle}>Email Support</Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#9ca3af"
            />
          </TouchableOpacity>

          {/* Phone Support */}
          <TouchableOpacity style={styles.contactRow}>
            <View style={styles.contactLeft}>
              <View style={styles.contactIconCircle}>
                <Ionicons name="call-outline" size={20} color="#2563eb" />
              </View>
              <View>
                <Text style={styles.contactTitle}>Phone Support</Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#9ca3af"
            />
          </TouchableOpacity>

          {/* Chat */}
          <TouchableOpacity style={styles.contactRow}>
            <View style={styles.contactLeft}>
              <View style={styles.contactIconCircle}>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={20}
                  color="#2563eb"
                />
              </View>
              <View>
                <Text style={styles.contactTitle}>Live Chat</Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  faqSection: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
    marginTop: 4,
  },
  faqHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  faqHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  faqBody: {
    marginTop: 8,
  },
  qaBlock: {
    marginBottom: 8,
  },
  questionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  answerText: {
    fontSize: 13,
    color: '#4b5563',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  contactSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
});
