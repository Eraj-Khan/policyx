from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.utils.decorators import method_decorator
from langchain.text_splitter import CharacterTextSplitter
# from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
# from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
import pickle
import os
from dotenv import load_dotenv


import pickle
from django.http import JsonResponse
import openai
from django.views.decorators.csrf import csrf_exempt
load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")



# Load trained objects (outside of request handling)

vectorstore_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'setup/vectorstore.pkl')
conversation_chain_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'setup/conversation_chain.pkl')

with open(vectorstore_path, "rb") as f:
    vectorstore = pickle.load(f)
with open(conversation_chain_path, "rb") as f:
    conversation_chain = pickle.load(f)
def get_answer(request):
    query = request.GET.get('query')
    if not query:
        return JsonResponse({'error': 'Query is required'}, status=400)
    
    response = conversation_chain({"question": query})
    print(response)
    latest_message = response["chat_history"][-1]
    return JsonResponse({'answer': latest_message.content})
def ping(request):
    return JsonResponse({'message': 'Chatbot is up and running!'})
