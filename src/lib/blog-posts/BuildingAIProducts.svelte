<script lang="ts">
	import BlogPostLayout from '../components/BlogPostLayout.svelte';
	import CodeSnippet from '../components/CodeSnippet.svelte';
	export let post;
</script>

<BlogPostLayout {post}>
	<p>After spending the last two years deep in the world of AI product development, I've learned that building successful AI applications is equal parts engineering challenge and product philosophy. The landscape has evolved dramatically, and many of the lessons I learned the hard way might save you some time and headaches.</p>

	<h2>Start with the Problem, Not the Technology</h2>

	<p>This might sound obvious, but I've seen countless AI projects fail because teams started with "How can we use GPT-4?" instead of "What problem are we actually solving?" The most successful AI products I've worked on began with a clear understanding of user pain points.</p>

	<p><strong>The key insight</strong>: AI should be invisible to your users. They don't care that you're using machine learning - they care that their problem gets solved effectively.</p>

	<h3>Real Example: Customer Support Automation</h3>

	<p>Early in my journey, I worked on an AI-powered customer support tool. Our first version was essentially a chatbot with GPT-3 that could answer questions. It was technically impressive but solved the wrong problem.</p>

	<CodeSnippet title="Simple AI Integration Pattern" language="javascript" filename="basic-ai-integration.js" code={`// ❌ Wrong approach: AI-first thinking
function buildChatbot() {
  return {
    name: "AI Customer Service Bot",
    model: "gpt-4",
    features: ["Answer any question", "Human-like responses"]
  };
}

// ✅ Right approach: Problem-first thinking  
function buildAgentAssist() {
  return {
    name: "Support Agent Assistant", 
    purpose: "Help agents be 40% more productive",
    features: [
      "Auto-categorize tickets",
      "Suggest responses from successful past resolutions", 
      "Highlight key customer information",
      "Escalate complex issues to senior agents"
    ]
  };
}

// The difference in implementation
const agentAssistWorkflow = {
  onNewTicket: (ticket) => {
    const category = aiCategorize(ticket.content);
    const urgency = determineUrgency(ticket, category);
    const suggestedResponse = findSimilarResolutions(category, ticket.content);
    
    return {
      category,
      urgency, 
      suggestedResponse,
      confidence: 0.87,
      needsHumanReview: urgency === 'high' || confidence < 0.8
    };
  }
};`} />

	<p>The real problem wasn't that customers needed another way to ask questions - it was that support agents spent 60% of their time on repetitive tasks that prevented them from helping customers with complex issues.</p>

	<p>We pivoted to building an agent-assist tool that:</p>
	<ul>
		<li>Automatically categorized incoming tickets</li>
		<li>Suggested responses based on previous successful resolutions</li>
		<li>Highlighted key information in customer messages</li>
	</ul>

	<p>The result? Agent productivity increased by 40%, and customer satisfaction improved because agents could focus on actually helping rather than searching through documentation.</p>

	<CodeSnippet title="Python AI Classification System" language="python" filename="ticket_classifier.py" code={`from transformers import pipeline
import numpy as np
from typing import Dict, List, Optional
import logging

class TicketClassifier:
    """AI-powered customer support ticket classifier
    
    This system automatically categorizes incoming support tickets
    and determines appropriate routing and response templates.
    """
    
    def __init__(self, model_name: str = "microsoft/DialoGPT-medium"):
        self.logger = logging.getLogger(__name__)
        
        # Initialize the classification pipeline
        try:
            self.classifier = pipeline(
                "text-classification",
                model=model_name,
                device=0 if self._gpu_available() else -1
            )
            self.logger.info(f"Loaded model: {model_name}")
        except Exception as e:
            self.logger.error(f"Failed to load model: {e}")
            raise
        
        # Define category mappings and keywords
        self.category_keywords = {
            'billing': ['payment', 'invoice', 'charge', 'refund', 'subscription'],
            'technical': ['bug', 'error', 'crash', 'not working', 'broken'],
            'feature_request': ['add', 'new feature', 'enhancement', 'suggestion'],
            'account': ['login', 'password', 'access', 'locked', 'signin']
        }
        
        # Response templates for each category
        self.response_templates = {
            'billing': "Thanks for contacting us about your billing inquiry. Let me help you with that...",
            'technical': "I understand you're experiencing a technical issue. Let's troubleshoot this together...",
            'feature_request': "Thank you for your suggestion! We appreciate feedback from our users...",
            'account': "I'll help you resolve this account access issue right away..."
        }
    
    def classify_ticket(self, message: str, customer_tier: str = 'standard') -> Dict:
        """
        Classify a support ticket and return comprehensive analysis
        
        Args:
            message: The customer's support request
            customer_tier: Customer tier (standard, premium, enterprise)
            
        Returns:
            Dictionary with classification results and recommendations
        """
        
        # Preprocess the message
        cleaned_message = self._preprocess_text(message)
        
        # Get AI prediction
        try:
            ai_result = self.classifier(cleaned_message)
            confidence = ai_result[0]['score']
            ai_category = ai_result[0]['label']
        except Exception as e:
            self.logger.error(f"Classification failed: {e}")
            confidence = 0.0
            ai_category = 'unknown'
        
        # Combine AI prediction with keyword matching
        keyword_category = self._keyword_classification(cleaned_message)
        final_category = self._combine_classifications(ai_category, keyword_category, confidence)
        
        # Determine urgency and routing
        urgency = self._determine_urgency(message, final_category, customer_tier)
        routing = self._determine_routing(final_category, urgency, confidence)
        
        return {
            'category': final_category,
            'confidence': confidence,
            'urgency': urgency,
            'routing': routing,
            'suggested_response': self.response_templates.get(final_category, "Thank you for contacting us..."),
            'escalate_to_human': confidence < 0.7 or urgency == 'critical',
            'estimated_resolution_time': self._estimate_resolution_time(final_category, urgency),
            'metadata': {
                'ai_category': ai_category,
                'keyword_category': keyword_category,
                'customer_tier': customer_tier
            }
        }
    
    def _preprocess_text(self, text: str) -> str:
        """Clean and normalize text for classification"""
        import re
        
        # Remove sensitive information
        text = re.sub(r'\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b', '[CARD]', text)  # Credit cards
        text = re.sub(r'\S+@\S+\.\S+', '[EMAIL]', text)  # Emails
        text = re.sub(r'http\S+', '[URL]', text)  # URLs
        text = re.sub(r'\b\d{3}[-.]\d{3}[-.]\d{4}\b', '[PHONE]', text)  # Phone numbers
        
        # Normalize whitespace and case
        return re.sub(r'\s+', ' ', text.lower().strip())
    
    def _keyword_classification(self, text: str) -> Optional[str]:
        """Classify based on keyword matching"""
        for category, keywords in self.category_keywords.items():
            if any(keyword in text for keyword in keywords):
                return category
        return None
    
    def _combine_classifications(self, ai_category: str, keyword_category: Optional[str], confidence: float) -> str:
        """Combine AI and keyword-based classifications"""
        if confidence > 0.8 and ai_category in self.category_keywords:
            return ai_category
        elif keyword_category:
            return keyword_category
        elif confidence > 0.6:
            return ai_category
        else:
            return 'general'
    
    def _determine_urgency(self, message: str, category: str, customer_tier: str) -> str:
        """Determine ticket urgency based on content and customer tier"""
        urgent_keywords = ['urgent', 'asap', 'emergency', 'critical', 'down', 'broken', 'can\'t access']
        
        message_lower = message.lower()
        has_urgent_keywords = any(keyword in message_lower for keyword in urgent_keywords)
        
        # Enterprise customers get higher priority
        if customer_tier == 'enterprise':
            if has_urgent_keywords or category in ['technical', 'account']:
                return 'critical'
            elif category == 'billing':
                return 'high'
            else:
                return 'medium'
        
        # Standard priority logic
        if has_urgent_keywords:
            return 'high'
        elif category in ['billing', 'account']:
            return 'medium'
        else:
            return 'low'
    
    def _determine_routing(self, category: str, urgency: str, confidence: float) -> str:
        """Determine which team should handle the ticket"""
        if confidence < 0.5:
            return 'general_support'
        
        routing_map = {
            'billing': 'billing_team',
            'technical': 'engineering_team' if urgency == 'critical' else 'technical_support',
            'account': 'account_team',
            'feature_request': 'product_team'
        }
        
        return routing_map.get(category, 'general_support')
    
    def _estimate_resolution_time(self, category: str, urgency: str) -> str:
        """Estimate resolution time based on category and urgency"""
        time_matrix = {
            ('billing', 'low'): '24-48 hours',
            ('billing', 'medium'): '12-24 hours', 
            ('billing', 'high'): '4-8 hours',
            ('technical', 'low'): '48-72 hours',
            ('technical', 'medium'): '24-48 hours',
            ('technical', 'high'): '8-12 hours',
            ('technical', 'critical'): '2-4 hours',
            ('account', 'medium'): '4-8 hours',
            ('account', 'high'): '1-2 hours',
            ('feature_request', 'low'): '1-2 weeks'
        }
        
        return time_matrix.get((category, urgency), '24-48 hours')
    
    def _gpu_available(self) -> bool:
        """Check if GPU is available for model inference"""
        try:
            import torch
            return torch.cuda.is_available()
        except ImportError:
            return False

# Usage example
def main():
    # Initialize the classifier
    classifier = TicketClassifier()
    
    # Example customer messages
    test_messages = [
        "I can't log into my account and need to access my billing information urgently",
        "There's a bug in your mobile app - it crashes every time I try to upload a photo",
        "Can you add a dark mode feature to the dashboard? It would be really helpful",
        "My credit card was charged twice this month, please help"
    ]
    
    # Classify each message
    for i, message in enumerate(test_messages, 1):
        print(f"\\n--- Ticket #{i} ---")
        print(f"Message: {message}")
        
        result = classifier.classify_ticket(message, customer_tier='premium')
        
        print(f"Category: {result['category']}")
        print(f"Confidence: {result['confidence']:.2f}")
        print(f"Urgency: {result['urgency']}")
        print(f"Route to: {result['routing']}")
        print(f"Escalate: {result['escalate_to_human']}")
        print(f"Est. resolution: {result['estimated_resolution_time']}")

if __name__ == "__main__":
    main()`} />

	<h2>The Data Reality Check</h2>

	<p>Here's something they don't tell you in AI tutorials: <strong>your data is probably messier than you think, and that's okay.</strong></p>

	<p>Most AI success stories you read about involve teams with pristine datasets. The reality is that you'll likely be working with inconsistent data formats, missing information, and legacy systems that weren't designed for AI.</p>

	<h2>The Human-AI Collaboration Sweet Spot</h2>

	<p>The most successful AI products I've built don't replace humans - they make humans more effective. This shift in thinking has been crucial to building products that actually get adopted.</p>

	<h3>The Collaborative Design Pattern</h3>

	<p>I've found this pattern works well:</p>
	<ul>
		<li><strong>AI handles the grunt work</strong>: Pattern recognition, data processing, initial analysis</li>
		<li><strong>Humans handle the nuanced decisions</strong>: Complex reasoning, edge cases, final judgment calls</li>
		<li><strong>The system learns from both</strong>: AI gets better from human feedback, humans get better insights from AI analysis</li>
	</ul>

	<h2>Technical Lessons That Matter</h2>

	<h3>1. Prompt Engineering is Product Engineering</h3>

	<p>Writing good prompts isn't just a technical skill - it's product development. The way you structure prompts directly impacts user experience.</p>

	<CodeSnippet title="Example: Good vs Bad Prompt Structure" language="javascript" filename="prompt-examples.js" code={`// ❌ Bad: Vague and unclear
const badPrompt = "Write something about AI";

// ✅ Good: Specific, structured, with context
const goodPrompt = \`
You are an AI product consultant helping a startup.
Context: The company builds productivity tools for remote teams.

Task: Write a 2-paragraph product description that:
- Highlights the main benefit (increased team collaboration)
- Mentions 3 key features
- Uses a professional but friendly tone
- Targets startup founders and team leads

Format: Keep it under 150 words total.
\`;

// ✅ Even better: With examples and constraints
const excellentPrompt = \`
You are an AI assistant helping with customer support automation.

Role: Customer support expert
Context: SaaS company with 10k+ users, common issues include billing, account access, and feature requests

Task: Classify this customer message and suggest a response template.

Input: "\${customerMessage}"

Output format:
{
  "category": "billing|technical|feature_request|other",
  "urgency": "low|medium|high", 
  "suggested_response": "template text here",
  "escalate_to_human": true/false
}

Examples:
- Billing questions = medium urgency, use billing template
- "Account locked" = high urgency, escalate to human
- Feature requests = low urgency, use feature request template
\`;`} />

	<h3>2. Latency Kills Adoption</h3>

	<p>No matter how accurate your AI is, if it takes 30 seconds to respond, users will abandon it. Streaming responses, async processing, and smart caching are essential.</p>

	<CodeSnippet title="Streaming AI Responses for Better UX" language="typescript" filename="streaming-response.ts" code={`// ✅ Stream responses for better perceived performance
async function streamAIResponse(prompt: string, onChunk: (text: string) => void) {
  const response = await fetch('/api/ai/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  
  if (!reader) return;
  
  while (true) {
    const { done, value } = await reader.read();
    
    if (done) break;
    
    const chunk = decoder.decode(value, { stream: true });
    const lines = chunk.split('\\n');
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data !== '[DONE]') {
          onChunk(data);
        }
      }
    }
  }
}

// Usage in your component
function handleAIQuery(userInput: string) {
  let accumulatedResponse = '';
  
  streamAIResponse(userInput, (chunk) => {
    accumulatedResponse += chunk;
    // Update UI in real-time
    updateResponseDisplay(accumulatedResponse);
  });
}`} />

	<h3>3. Plan for Failure (Because It Will Happen)</h3>

	<p>AI systems fail differently than traditional software. Instead of clear error messages, you get subtly wrong answers. Build in confidence scores, fallback strategies, and human escalation paths.</p>

	<CodeSnippet title="AI Error Handling & Fallback Strategies" language="typescript" filename="ai-error-handling.ts" code={`interface AIResponse {
  result: string;
  confidence: number;
  metadata: {
    model: string;
    tokens_used: number;
    processing_time_ms: number;
  };
}

async function robustAICall(prompt: string, options: {
  minConfidence?: number;
  maxRetries?: number;
  fallbackStrategy?: 'human' | 'template' | 'simpler_model';
} = {}): Promise<AIResponse | 'ESCALATE'> {
  
  const { minConfidence = 0.7, maxRetries = 2, fallbackStrategy = 'human' } = options;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await callAIModel(prompt);
      
      // Check confidence threshold
      if (response.confidence >= minConfidence) {
        return response;
      }
      
      // Low confidence - try fallback strategies
      if (attempt === maxRetries) {
        switch (fallbackStrategy) {
          case 'template':
            return getTemplateResponse(prompt);
          case 'simpler_model':
            return await callSimplerModel(prompt);
          case 'human':
          default:
            return 'ESCALATE';
        }
      }
      
    } catch (error) {
      console.error(\`AI call attempt \${attempt + 1} failed:\`, error);
      
      if (attempt === maxRetries) {
        // Final attempt failed - escalate
        await logFailureForReview(prompt, error);
        return 'ESCALATE';
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  
  return 'ESCALATE';
}

// Usage with proper error handling
async function handleUserQuery(query: string) {
  const result = await robustAICall(query, {
    minConfidence: 0.8,
    maxRetries: 3,
    fallbackStrategy: 'template'
  });
  
  if (result === 'ESCALATE') {
    // Route to human support
    await createSupportTicket(query);
    return "I've forwarded your question to our team. You'll hear back within 24 hours.";
  }
  
  return result.result;
}`} />
</BlogPostLayout>
