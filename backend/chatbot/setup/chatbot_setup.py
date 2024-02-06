import os
import pickle
from dotenv import load_dotenv
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from PyPDF2 import PdfReader

def train_bot(pdf_folder_path):
    """Trains the bot and returns the vectorstore and conversation chain."""
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
        separator="\n",
        chunk_size=300,
        chunk_overlap=100,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def get_conversation_chain(vectorstore):
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory,
        max_tokens_limit=50,
    )
    return conversation_chain

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
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=OpenAIEmbeddings())

    # Create conversation chain
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(
        memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectorstore.as_retriever(),
        memory=memory
    )

    return vectorstore, conversation_chain
load_dotenv()
# Example usage:
load_dotenv()
pdf_folder_path = "./pdfs"
vectorstore, conversation_chain = train_bot(pdf_folder_path)
# if __name__ == "__main__":
#     # Specify the PDF folder path or other configuration as needed
#     pdf_folder_path = "/home/xloop/Desktop/chat/myproject/pdfs"

#     # Execute the training function
#     train_bot(pdf_folder_path)
