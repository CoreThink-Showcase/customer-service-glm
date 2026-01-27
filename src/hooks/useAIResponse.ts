import { useState, useCallback } from 'react';
import { Message } from '../types';

const KNOWLEDGE_BASE: Record<string, string> = {
  'shipping': 'We offer free standard shipping on orders over $50. Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for $9.99, and overnight shipping is available for $19.99.',
  'return': 'Our return policy allows you to return items within 30 days of purchase. Items must be unworn, unwashed, and in original packaging with tags attached. You can initiate a return through your account or contact customer service.',
  'refund': 'Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method. You will receive an email confirmation once the refund is processed.',
  'payment': 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Afterpay for installment payments.',
  'order': 'To check your order status, please log into your account and visit "My Orders". You can also use the order tracking link sent to your email. If you need further assistance, please provide your order number.',
  'delivery': 'Delivery times vary by shipping method: Standard (3-5 business days), Express (1-2 business days), Overnight (next business day). Please note that orders placed after 2 PM EST will be processed the next business day.',
  'cancel': 'Orders can be cancelled within 1 hour of placing them. After that, please contact our customer service team. If your order has already shipped, you will need to follow our return process once you receive the items.',
  'contact': 'You can reach our customer service team via email at support@example.com, by phone at 1-800-555-0199, or through this chat service. Our team is available Monday-Friday 9 AM - 8 PM EST and Saturday-Sunday 10 AM - 6 PM EST.',
  'size': 'We offer a detailed size guide on each product page. We recommend measuring yourself and comparing with our size chart. If you receive an item that doesn\'t fit, you can exchange it for a different size within 30 days.',
  'stock': 'If an item is out of stock, you can sign up for restock notifications on the product page. We\'ll email you as soon as it becomes available again. Popular items are typically restocked within 2-3 weeks.',
  'discount': 'We offer various promotions throughout the year. Sign up for our newsletter to receive exclusive discounts and early access to sales. Current promotions are displayed on our homepage and in the "Sale" section.',
  'default': 'I\'m here to help! I can assist you with questions about shipping, returns, refunds, payments, order tracking, delivery, cancellations, sizing, stock availability, and discounts. What would you like to know more about?'
};

export const useAIResponse = () => {
  const [isTyping, setIsTyping] = useState(false);

  const findBestResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(KNOWLEDGE_BASE)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return KNOWLEDGE_BASE.default;
  }, []);

  const getAIResponse = useCallback(async (userMessage: string): Promise<Message> => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const response = findBestResponse(userMessage);
    
    setIsTyping(false);
    
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };
  }, [findBestResponse]);

  return {
    isTyping,
    getAIResponse,
  };
};
