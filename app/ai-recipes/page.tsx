"use client"

import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, Gavel, Stethoscope, DollarSign, ShoppingBag, Factory, GraduationCap } from "lucide-react"
import type React from "react" // Added import for React

interface Recipe {
  id: string
  title: string
  industry: string
  icon: React.ElementType
  goal: string
  tools: string[]
  steps: string[]
}

const recipes: Recipe[] = [
  {
    id: "legal-doc-review",
    title: "AI-Powered Legal Document Review and Summarization",
    industry: "Legal Industry",
    icon: Gavel,
    goal: "Automate the review and summarization of legal contracts and documents.",
    tools: ["spaCy", "Hugging Face Transformers", "LangChain", "OpenAI GPT-3"],
    steps: [
      "Use spaCy to extract important legal entities (e.g., clauses, dates, parties) from the contract.",
      "Summarize the extracted text using a pre-trained transformer model like T5 from Hugging Face.",
      "Run the summary through LangChain, which applies AI models to assess potential legal risks (e.g., unusual clauses or missing terms).",
      "Use GPT-3 to generate a risk assessment and legal recommendations based on the contract.",
      "Output the summary, risk assessment, and legal suggestions for review by legal professionals.",
    ],
  },
  {
    id: "healthcare-diagnostics",
    title: "AI-Powered Healthcare Diagnostics",
    industry: "Healthcare Industry",
    icon: Stethoscope,
    goal: "Assist in diagnosing diseases based on medical imaging and patient history.",
    tools: ["TensorFlow/PyTorch", "spaCy", "Hugging Face Transformers", "Scikit-learn"],
    steps: [
      "Process medical images using a TensorFlow or PyTorch-based convolutional neural network (CNN) model to identify abnormalities (e.g., tumors, fractures).",
      "Use spaCy to extract patient symptoms, diagnosis history, and medical conditions from doctor's notes.",
      "Combine image-based findings with text-based patient data using Scikit-learn to predict patient risk (e.g., likelihood of disease progression).",
      "Run predictions through Hugging Face's transformers to provide additional clinical context based on similar cases.",
      "Provide a comprehensive diagnostic report with risk levels and recommendations for further testing or treatment.",
    ],
  },
  {
    id: "finance-fraud-detection",
    title: "AI-Enhanced Fraud Detection",
    industry: "Finance Industry",
    icon: DollarSign,
    goal: "Detect fraudulent transactions and activities in financial transactions.",
    tools: ["TensorFlow/PyTorch", "Scikit-learn", "Django/Flask", "XGBoost"],
    steps: [
      "Collect transaction data (e.g., amount, location, merchant) and preprocess it for anomaly detection using Scikit-learn.",
      "Use TensorFlow or PyTorch to train deep learning models to detect patterns of fraudulent activity, such as unusual spending behavior.",
      "Integrate XGBoost to improve model performance, using a mix of supervised learning (fraud vs. non-fraud) and unsupervised anomaly detection.",
      "Use Django or Flask to set up real-time transaction monitoring, sending alerts when potentially fraudulent transactions occur.",
      "Provide actionable insights (e.g., flagging high-risk accounts) through an integrated dashboard.",
    ],
  },
  {
    id: "retail-customer-support",
    title: "AI-Driven Customer Support Chatbot",
    industry: "Retail Industry",
    icon: ShoppingBag,
    goal: "Automate customer support queries and improve response time for common issues.",
    tools: ["Rasa", "spaCy", "Hugging Face GPT-3", "Elasticsearch"],
    steps: [
      "Build a chatbot using Rasa to handle standard customer support inquiries (e.g., shipping status, product questions).",
      "Use spaCy to process customer queries, extracting key entities like product names, dates, and issues.",
      "When more complex queries arise, use GPT-3 to generate human-like responses and handle specific customer concerns.",
      "Integrate Elasticsearch to provide fast, relevant answers by searching product databases or support knowledge bases.",
      "Continuously improve the chatbot by using customer feedback and training data to enhance its accuracy and response quality.",
    ],
  },
  {
    id: "manufacturing-predictive-maintenance",
    title: "AI-Powered Predictive Maintenance",
    industry: "Manufacturing Industry",
    icon: Factory,
    goal: "Predict equipment failure and schedule maintenance to reduce downtime.",
    tools: ["TensorFlow/PyTorch", "Scikit-learn", "Apache Kafka", "Flask"],
    steps: [
      "Collect real-time sensor data from machines (e.g., temperature, vibration, RPM) and stream it using Apache Kafka.",
      "Train a TensorFlow or PyTorch model on historical sensor data to predict equipment failure or maintenance needs.",
      "Use Scikit-learn to classify failure risks based on sensor readings, applying regression models to forecast the time to failure.",
      "Use Flask to integrate the predictive maintenance system with the manufacturing company's existing maintenance software.",
      "Provide maintenance teams with real-time alerts and predictions, including actionable recommendations (e.g., part replacement, preventive measures).",
    ],
  },
  {
    id: "education-personalized-learning",
    title: "AI-Powered Personalized Learning Assistant",
    industry: "Education Industry",
    icon: GraduationCap,
    goal: "Deliver personalized learning experiences based on student behavior and progress.",
    tools: ["TensorFlow/PyTorch", "spaCy", "OpenAI GPT-3", "Flask/Django"],
    steps: [
      "Analyze student behavior (e.g., quiz scores, study habits) using TensorFlow or PyTorch to identify learning patterns.",
      "Process feedback and text-based responses from students using spaCy to understand their knowledge gaps.",
      "Use GPT-3 to generate personalized learning content, including explanations or additional exercises tailored to each student's needs.",
      "Serve personalized content via a Flask or Django web app, allowing students to access tailored lessons and feedback.",
      "Monitor student progress in real-time and adjust content based on performance and engagement levels.",
    ],
  },
]

export default function AIRecipesPage() {
  const [openRecipes, setOpenRecipes] = useState<Set<string>>(new Set())

  const toggleRecipe = (recipeId: string) => {
    const newOpenRecipes = new Set(openRecipes)
    if (newOpenRecipes.has(recipeId)) {
      newOpenRecipes.delete(recipeId)
    } else {
      newOpenRecipes.add(recipeId)
    }
    setOpenRecipes(newOpenRecipes)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Recipes for Various Industries</h1>
      <div className="space-y-6">
        {recipes.map((recipe) => (
          <Collapsible
            key={recipe.id}
            open={openRecipes.has(recipe.id)}
            onOpenChange={() => toggleRecipe(recipe.id)}
            className="border border-border rounded-lg overflow-hidden transition-all duration-200"
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full p-4 text-left hover:bg-accent/50"
              >
                <div className="flex items-center space-x-4">
                  <recipe.icon className="w-6 h-6 text-primary" />
                  <div>
                    <h2 className="text-xl font-semibold">{recipe.title}</h2>
                    <p className="text-sm text-muted-foreground">{recipe.industry}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openRecipes.has(recipe.id) ? "transform rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 bg-accent/30">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Goal:</h3>
                  <p>{recipe.goal}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tools/Frameworks:</h3>
                  <ul className="list-disc list-inside">
                    {recipe.tools.map((tool, index) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Recipe Steps:</h3>
                  <ol className="list-decimal list-inside">
                    {recipe.steps.map((step, index) => (
                      <li key={index} className="mb-2">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

