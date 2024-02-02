# Chatbot Project

This Django project implements a chatbot using LangChain for natural language processing and conversation retrieval. The chatbot is trained on insurance-related PDF documents.


This project integrates Django, LangChain, and OpenAI to create a chatbot trained on insurance-related documents. The chatbot can respond to user queries based on the trained data.

## Features

- Django web application
- LangChain for natural language processing
- OpenAI for chat model
- Training on insurance-related PDF documents

# Install dependencies:


pip install -r requirements.txt

langchain==0.0.184
PyPDF2==3.0.1
python-dotenv==1.0.0
streamlit==1.18.1
openai==0.27.6
faiss-cpu==1.7.4
altair==4
tiktoken==0.4.0


Set up environment variables:

# Create a .env file in the project root and add the following:
add there lines 

OPENAI_API_KEY=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
HUGGINGFACEHUB_API_TOKEN=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



python manage.py migrate

# Training the Chatbot
To train the chatbot on insurance-related PDF documents, follow these steps:



# Run the training script:

python chatbot_train.py


This will create vectorstore.pkl and conversation_chain.pkl files.

Usage
Run the Django development server:


python manage.py runserver
Visit http://localhost:3000 in your browser to interact with the chatbot.

