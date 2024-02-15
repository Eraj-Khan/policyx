import os
import pickle
from dotenv import load_dotenv
from langchain.text_splitter import CharacterTextSplitter
# from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from PyPDF2 import PdfReader

from langchain_community.embeddings import HuggingFaceEmbeddings
# from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import (
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
)
import openai

insrunction_prompt =  ''' 
    You are policyX professional chatbot assistant for insurance buyers seeking guidance on how to operate our platform policyX and some general information about insurance."
    provide straight answer not that much detail and alway answer in points
    policyX is an intermediary platform that connects insurance buyers and insurance companies on a single platform. For insurance buyers, we provide an experience where they have to fill up a form containing Age, BMI, gender, income, etc. This form will then be sent to all the registered insurance companies. These different companies will bid their coverage plans, containing information like total coverage and premium charges, which insurance buyers have to pay. This way, the coverage is custom-based on different insurance buyers' information.

    Below is an example conversation:
    
    Question: 
     What can you tell me about insurance?   
     PolicyX Chatbot: 
     Insurance is a financial product that provides protection against potential financial losses. It works by transferring the risk from an individual or entity to an insurance company in exchange for payment of a premium.
     Various types of insurance exist, such as 
     1. Health insurance 
     2. Life insurance 
     3. Auto insurance
     4. Home insurance
    each offering specific coverage options tailored to different needs and risks
    
    Question: who is adolf hitler?
    PolicyX Chatbot: Sorry, I can only provide you insurance and our platform policyX related queries. What would you like to know about policyX?

    Question: what do you know about world war 3?
    PolicyX Chatbot: Sorry, I can only provide you insurance and our platform policyX related queries. What would you like to know about policyX?

    {question}
    PolicyX Chatbot:
'''


# system_template = """End every answer with "Ahoi Maty I love you". Use the following pieces of context to answer the users question. 
# If you cannot find the answer from the pieces of context, just say that you don't know, don't try to make up an answer.
# ----------------
# {context}"""
system_template = """ You are responsible for providing information only related to our platform policyX and information 
related to insurance to the insurance buyers. If insurance buyers ask any irrelevant questions or questions that are not related to insurance, 
respond with: "Sorry, I would only be able to provide insurance and our platform policyX related queries
Use the following pieces of context to answer the users question. if the following context doesnot contain answer and question is related to
insurance just think and answer.

----------------
{context}"""

def save_to_dir_vectorstore_and_chain(pdf_folder_path):
    # Process PDFs
    vectorstore, conversation_chain = get_vectorstore_and_chain(pdf_folder_path)

    # Save trained model
    with open("vectorstore.pkl", "wb") as f:
        pickle.dump(vectorstore, f)
    with open("conversation_chain.pkl", "wb") as f:
        pickle.dump(conversation_chain, f)

    return vectorstore, conversation_chain

def get_pdf_text(pdf_docs):
    text = ""
    for pdf in pdf_docs:
        pdf_reader = PdfReader(pdf)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\\n",
        chunk_size=300,
        chunk_overlap=100,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks


def get_vectorstore_and_chain(pdf_folder_path):
    # Get a list of PDF files in the specified folder
    pdf_files = [os.path.join(pdf_folder_path, file) for file in os.listdir(pdf_folder_path) if file.endswith('.pdf')]

    if not pdf_files:
        print("No PDF files found in the specified folder.")
        return None, None

    # Read PDFs and get text
    raw_text = get_pdf_text(pdf_files)

    # Get text chunks
    text_chunks = get_text_chunks(raw_text)

    # Create vector store
    # vectorstore = FAISS.from_texts(texts=text_chunks, embedding=OpenAIEmbeddings())
    embeddings = HuggingFaceEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)


    llm = ChatOpenAI()
    # llm = ChatGoogleGenerativeAI(model="gemini-pro",convert_system_message_to_human=True,
    #   temperature=0)
    # Create conversation chain
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    
    messages = [
    SystemMessagePromptTemplate.from_template(system_template),
    # HumanMessagePromptTemplate.from_template("{question}")
    HumanMessagePromptTemplate.from_template(insrunction_prompt)

    ]
    qa_prompt = ChatPromptTemplate.from_messages(messages)
    # st.write("qa_prompt", qa_prompt)
    # print(qa_prompt)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory,
        combine_docs_chain_kwargs={"prompt": qa_prompt},
        max_tokens_limit=50,
        
    )
    return vectorstore, conversation_chain

if __name__ == "__main__":
    load_dotenv()
    openai.api_key= "hello"
    # openai.api_key = os.environ.get("OPENAI_API_KEY")
    # GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
    # print("API_KEY",GOOGLE_API_KEY)
    # os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

    pdf_folder_path = "./pdfs"
    vectorstore, conversation_chain = save_to_dir_vectorstore_and_chain(pdf_folder_path)

