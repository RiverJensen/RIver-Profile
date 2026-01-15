# RAG Pipeline (resident interviews)

**By Steven Stemmer**  
**Last Updated:** 1 day ago

## Overview

This document outlines our LLM-powered pipeline designed to automate the extraction of key information from resident interviews in the TSO Life app, aiming to efficiently populate resident profiles.

## Related Documents
- **Database Schema Document:** database_schema.md
- **Question Formats Document:** QUESTION_FORMATS.md
- **Pipeline Explained:** Video Presentation Link

## How it Works

### Input & Preprocessing
Audio recordings from interviews are transcribed. These transcripts are then chunked and indexed into a vector database based on semantic meaning.

### Information Extraction (RAG Pipeline)
We use a Retrieval Augmented Generation (RAG) approach. For a predefined set of ~80 questions, the system retrieves the most relevant text snippets from the transcript. An LLM then uses these snippets and the original question to generate an answer. This minimizes hallucination and focuses the LLM on the provided text.

### Human Review & Validation
The LLM's answers, along with the context it used, are presented to a review team via a "data mine form." This team verifies accuracy, makes corrections, and identifies the precise context for the correct answer.

### Data Storage & LLM Improvement
All data, including LLM responses, reviewer corrections, and validated context, is stored in our relational database. This validated data is crucial for creating training sets to fine-tune and continuously improve the LLM's performance.

## Current Status & Benefits

- The pipeline successfully automates extracting information from audio interviews
- The review interface facilitates quality control and captures valuable data for LLM training
- We are actively collecting data to enhance the LLM's accuracy

## Key Challenge & Next Steps

A primary challenge is efficiently consolidating validated data for training, especially for complex, multi-part questions where answers and their components are stored across multiple database entries. Currently, this involves some manual, script-based processing for specific question types.

Our immediate focus is to develop a more robust, automated pipeline to generate comprehensive training data directly from our validated database records. This will streamline the LLM fine-tuning process, improve model accuracy across all question types, and ensure scalability.