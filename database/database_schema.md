# Database Schema Document

**Version:** 1.0
**Date:** May 6, 2025
**Author:** Ernesto Jimenez

**Overview:**

This document describes the database schema for the TSOLife LLM Pipeline application, focusing on the storage of audio recordings, transcriptions, user information, and the data generated and managed by the LLM (Large Language Model) information extraction pipeline.

The database is designed to support a complete workflow from audio interview recordings to structured data extraction using RAG (Retrieval-Augmented Generation) techniques. The system processes audio interviews between senior home communities and their residents, transcribes them, and extracts structured information about residents' preferences, well-being, and personal histories.

## Key Concepts

### Data Flow Overview
1. **Audio Recording**: Audio interviews are stored with metadata in the `recordings` and `media` tables
2. **Transcription**: Audio is transcribed and stored in the `transcriptions` table
3. **LLM Processing**: Transcriptions are processed by the LLM pipeline, creating entries in `llmTranscriptions`
4. **Question Processing**: Individual questions are processed and responses stored in `llmTranscriptionQuestions` and `llmTranscriptionQuestionResponses`
5. **Context Management**: Relevant context snippets are stored in `llmTranscriptionQuestionContext`
6. **Review Process**: Human reviewers validate and correct LLM responses, updating validity flags

### Review Team Workflow
A review team validates LLM responses and marks them as correct/incorrect using the `isValidInd` flags. They can also provide corrected responses, which are stored with `isFromLLmInd = 0`.

The **Data-Mine** form used by the Review Team can be found here:

https://tsolife.com/admin/interviews/data-mine/{llmTranscriptions.id}/general-form

Once saved, this data is transfered to the resident profile, under the General Form tab:

https://tsolife.com/communities/{userRoles.roleableId}/residents/{users.id}'

Where the variables below are retrieved from the database: 

* `llmTranscriptions.id`
* `userRoles.roleableId`
* `users.id`

---

## Table Definitions

### 1. `recordings`
*   **Description:** Stores metadata and status for audio recordings from resident interviews.
*   **Icon:** `audio`
*   **Color:** `black`
*   **Columns:**
    | Column Name       | Data Type | Constraints/PK/FK                     | Description                                            |
    |-------------------|-----------|---------------------------------------|--------------------------------------------------------|
    | `id`              | string    | PK                                    | Unique identifier for the recording.                   |
    | `mediaId`         | string    | FK -> `media.id`                      | Identifier for the associated media file.              |
    | `details`         | string    |                                       | Additional details or notes about the recording.       |
    | `userId`          | string    | FK -> `users.id`                      | Identifier of the user associated with this recording. |
    | `interviewedById` | string    |                                       | Identifier of the user who conducted the interview.    |
    | `status`          | string    | Enum: `TRANSCRIBED`, `UPLOADED`, `FAILED` | Current status of the recording.                       |
    | `type`            | string    |                                       | Type or category of the recording.                     |
    | `durationInSec`   | number    |                                       | Length of the audio recording in seconds.              |
    | `updatedAt`       | date      |                                       | Timestamp of the last update.                          |
    | `createdAt`       | date      |                                       | Timestamp of creation.                                 |

### 2. `media`
*   **Description:** Stores information about media files, primarily audio recordings.
*   **Icon:** `audio`
*   **Color:** `black`
*   **Columns:**
    | Column Name  | Data Type | Constraints/PK/FK | Description                                                |
    |--------------|-----------|-------------------|------------------------------------------------------------|
    | `id`         | string    | PK                | Unique identifier for the media item.                      |
    | `name`       | File      |                   | Name of the media file.                                    |
    | `parentId`   | string    |                   | Identifier for a parent entity, if applicable.             |
    | `bucketName` | string    |                   | Name of the storage bucket (e.g., GCS bucket).             |
    | `resource`   | string    |                   | Path or identifier of the resource within the bucket.      |
    | `url`        | string    |                   | Public or signed URL to access the media.                  |
    | `mediableId` | string    |                   | Identifier for the entity this media is associated with. |
    | `updatedAt`  | date      |                   | Timestamp of the last update.                              |
    | `createdAt`  | date      |                   | Timestamp of creation.                                     |
    | `deletedAt`  | date      | nullable          | Timestamp if the media item is soft-deleted.             |

### 3. `transcriptions`
*   **Description:** Stores the transcribed text and status from audio recordings.
*   **Icon:** `file`
*   **Color:** `green`
*   **Columns:**
    | Column Name  | Data Type | Constraints/PK/FK                   | Description                                                         |
    |--------------|-----------|-------------------------------------|---------------------------------------------------------------------|
    | `id`         | string    | PK                                  | Unique identifier for the transcription.                            |
    | `recordingId`| string    | FK -> `recordings.id`               | Identifier of the audio recording this transcription belongs to.    |
    | `status`     | string    | Enum: `COMPLETED`, `TRANSCRIBING`, `FAILED` | Current status of the transcription process.                        |
    | `detail`     | string    |                                     | Additional details or error messages related to the transcription.  |
    | `plainText`  | string    |                                     | The full transcribed text from the audio.                           |
    | `externalId` | string    | nullable                            | Identifier for this transcription's representation (e.g., vector DB). |
    | `updatedAt`  | date      |                                     | Timestamp of the last update.                                       |
    | `createdAt`  | date      |                                     | Timestamp of creation.                                              |
    | `deletedAt`  | date      | nullable                            | Timestamp if the transcription is soft-deleted.                     |

### 4. `users`
*   **Description:** Stores basic user account information.
*   **Icon:** `folder`
*   **Color:** `gray`
*   **Columns:**
    | Column Name | Data Type | Constraints/PK/FK | Description                     |
    |-------------|-----------|-------------------|---------------------------------|
    | `id`        | string    | PK                | Unique identifier for the user. |
    | `email`     | email     | Unique            | User's email address.           |

### 5. `userProfiles`
*   **Description:** Stores additional profile information for users.
*   **Icon:** `message-circle`
*   **Color:** `gray`
*   **Columns:**
    | Column Name     | Data Type | Constraints/PK/FK        | Description                             |
    |-----------------|-----------|--------------------------|-----------------------------------------|
    | `id`            | string    | PK                       | Unique identifier for the user profile. |
    | `firstName`     | string    |                          | User's first name.                      |
    | `preferredName` | string    | nullable                 | User's preferred name.                  |
    | `lastName`      | string    |                          | User's last name.                       |
    | `userId`        | string    | FK -> `users.id`, Unique | Identifier of the associated user.      |
    | `updatedAt`     | date      |                          | Timestamp of the last update.           |
    | `createdAt`     | date      |                          | Timestamp of creation.                  |

### 6. `userRoles`
*   **Description:** Manages roles assigned to users, potentially for different contexts.
*   **Icon:** `mail`
*   **Color:** `gray`
*   **Columns:**
    | Column Name | Data Type | Constraints/PK/FK | Description                                            |
    |-------------|-----------|-------------------|--------------------------------------------------------|
    | `id`        | string    | PK                | Unique identifier for the role assignment.             |
    | `userId`    | string    | FK -> `users.id`  | Identifier of the user.                                |
    | `roleId`    | string    |                   | Identifier of the assigned role.                       |
    | `roleableId`| string    | nullable          | Identifier for the entity this role is scoped to.      |
    | `updatedAt` | date      |                   | Timestamp of the last update.                          |
    | `createdAt` | date      |                   | Timestamp of creation.                                 |

### 7. `llmTranscriptions`
*   **Description:** Stores metadata about an LLM extraction process performed on a transcription. This table represents one complete run of the LLM pipeline on a specific transcript, processing all questions defined in the system (approximately 85 questions).
*   **Icon:** `folder`
*   **Color:** `black`
*   **Purpose:** Tracks the overall processing session and provides metrics on question processing success rates.
*   **Columns:**
    | Column Name              | Data Type | Constraints/PK/FK                     | Description                                                              |
    |--------------------------|-----------|---------------------------------------|--------------------------------------------------------------------------|
    | `id`                     | string    | PK                                    | Unique identifier for the LLM transcription process.                     |
    | `transcriptionId`        | string    | FK -> `transcriptions.id`, Unique     | Identifier of the transcription processed. |
    | `userId`                 | string    | nullable, FK -> `users.id`            | Identifier of the user associated with this LLM process.                 |
    | `saveAllInd`             | number    |                                       | Indicator if answers were saved without manual review (1=true, 0=false). When true, indicates the review team accepted all LLM responses without human validation. |
    | `totalQuestionsAsked`    | number    |                                       | Total number of questions the LLM was prompted with during this processing session. |
    | `totalQuestionsAnswered` | number    |                                       | Number of questions the LLM successfully provided a response for. Used to calculate success rates. |
    | `updatedAt`              | date      |                                       | Timestamp of the last update.                                            |
    | `createdAt`              | date      |                                       | Timestamp of creation.                                                   |
    | `deletedAt`              | date      | nullable                              | Timestamp if the LLM transcription record is soft-deleted.               |

### 8. `llmTranscriptionQuestions`
*   **Description:** Stores data for each individual question processed by the LLM during an `llmTranscriptions` instance. This table contains the raw LLM response and metadata for each question asked during the processing session.
*   **Icon:** `folder`
*   **Color:** `black`
*   **Purpose:** Tracks individual question processing and stores the raw, unprocessed LLM response for each question.
*   **Key Features:** 
    - Supports polymorphic question references (can reference either `questions` or `communityAssessmentFields`)
    - Handles grouped questions (Object String/List Questions) using `groupUuid` and `groupIndex`
    - Stores raw LLM response before human review and validation
*   **Columns:**
    | Column Name                       | Data Type | Constraints/PK/FK                                       | Description                                                                       |
    |-----------------------------------|-----------|---------------------------------------------------------|-----------------------------------------------------------------------------------|
    | `id`                              | string    | PK                                                      | Unique identifier for a specific LLM question instance.                           |
    | `llmTranscriptionId`              | string    | FK -> `llmTranscriptions.id`                            | Identifier of the parent LLM transcription process.                             |
    | `questionableId`                  | string    | FK -> `questions.id` OR `communityAssessmentFields.id`  | Identifier of the question definition (polymorphic).                            |
    | `questionableType`                | string    |                                                         | Type of the question to resolve polymorphic `questionableId` ("Question" or "CommunityAssessmentField"). |
    | `isValidInd`                      | number    | nullable                                                | LLM's initial response validity assessment (1=true, 0=false). **Note:** Final validity is determined in the `llmTranscriptionQuestionResponses` table after human review. |
    | `groupIndex`                      | number    | nullable                                                | For multi-part questions (Object String/List Questions), indicates position within the group. **Object List Questions**: All responses at the same position across sub-questions share the same groupIndex (1, 2, 3...). **Object String Questions**: Since there is only one response for each question, they all have groupIndex = 1. |
    | `groupUuid`                       | string    | nullable                                                | For multi-part questions, a UUID to group related question parts together. **Object String Questions**: All sub-fields share the same groupUuid. **Object List Questions**: All responses at the same position across sub-questions share the same groupUuid. **Other question types**: NULL. |
    | `rawLlmResponse`                  | string    |                                                         | The complete, unparsed response from the LLM for this question. Contains the raw JSON or text response before any processing or validation. |
    | `llmTranscriptionQuestionProblemId` | string    | nullable                                                | Identifier for any problem noted with this LLM question instance. Links to a problem tracking system for debugging and improvement. |
    | `updatedAt`                       | date      |                                                         | Timestamp of the last update.                                                     |
    | `createdAt`                       | date      |                                                         | Timestamp of creation.                                                            |
    | `deletedAt`                       | date      | nullable                                                | Timestamp if this question instance is soft-deleted.                              |

### 9. `llmQuestionParameters`
*   **Description:** Stores the parameters used to prompt the LLM for a specific question definition.
*   **Icon:** `folder`
*   **Color:** `black`
*   **Columns:**
    | Column Name         | Data Type    | Constraints/PK/FK                                                       | Description                                                              |
    |---------------------|--------------|-------------------------------------------------------------------------|--------------------------------------------------------------------------|
    | `id`                | string       | PK                                                                      | Unique identifier for the set of parameters.                             |
    | `questionableId`    | string       | FK -> `questions.id` OR `communityAssessmentFields.id`, Unique with Type  | Identifier of the question definition these parameters apply to.           |
    | `questionableType`  | string       |                                                                         | Type of the question to resolve polymorphic `questionableId`.            |
    | `mainQuestion`      | string       |                                                                         | The primary question text provided to the LLM.                           |
    | `instructions`      | string       | nullable                                                                | Additional instructions provided to the LLM.                             |
    | `format`            | string       | nullable                                                                | Specific formatting instructions for the LLM's response (e.g., JSON).    |
    | `retrievalQuestions`| string/JSON  | nullable                                                                | List of questions/phrases used for context retrieval in RAG.             |
    | `updatedAt`         | date         |                                                                         | Timestamp of the last update.                                            |
    | `createdAt`         | date         |                                                                         | Timestamp of creation.                                                   |
    | `deletedAt`         | date         | nullable                                                                | Timestamp if these parameters are soft-deleted.                          |

### 10. `llmTranscriptionQuestionResponses`
*   **Description:** Stores the final, validated responses for LLM-answered questions after human review. This table contains the authoritative answers that have been validated by the review team or accepted from the LLM.
*   **Icon:** `folder`
*   **Color:** `black`
*   **Purpose:** Maintains the final, validated answers for each question after the review process. This is the source of truth for question responses.
*   **Key Features:**
    - One-to-one relationship with `llmTranscriptionQuestions` (each question has exactly one final response)
    - Tracks whether the response came from the LLM or was manually corrected by reviewers
    - Stores both the final answer and any reviewer comments
    - Special handling for Rating Questions (rating in `response`, comment in `comments`)
*   **Review Process:** When reviewers validate responses, they can either accept the LLM response (isFromLLmInd=1) or provide a corrected response (isFromLLmInd=0).
*   **Columns:**
    | Column Name                | Data Type | Constraints/PK/FK                                | Description                                                                   |
    |----------------------------|-----------|--------------------------------------------------|-------------------------------------------------------------------------------|
    | `id`                       | string    | PK                                               | Unique identifier for the response.                                           |
    | `llmTranscriptionQuestionId` | string    | FK -> `llmTranscriptionQuestions.id`, Unique     | Identifier of the LLM question instance this response pertains to. **One-to-one relationship.** |
    | `response`                 | string    |                                                  | The final, validated answer. For Rating Questions, this contains the rating value (0-4). |
    | `comments`                 | string    | nullable                                         | Reviewer comments or additional notes. For Rating Questions, this contains the extracted comment text. |
    | `isFromLLmInd`             | number    |                                                  | Source indicator: 1=response came from LLM (accepted), 0=manually corrected by reviewer. |
    | `isValidInd`               | number    |                                                  | Validity indicator: 1=response is correct and validated, 0=response is incorrect or needs revision. |
    | `options`                  | string    | nullable                                         | Any selected options from predefined choices, stored as JSON or delimited string. |
    | `updatedAt`                | date      |                                                  | Timestamp of the last update.                                                 |
    | `createdAt`                | date      |                                                  | Timestamp of creation.                                                        |
    | `deletedAt`                | date      | nullable                                         | Timestamp if this response is soft-deleted.                                   |

### 11. `llmTranscriptionQuestionContext`
*   **Description:** Stores the specific context snippets (chunks) from the transcription that were provided to the LLM to answer each question. This table tracks which parts of the transcript were deemed relevant for each question's answer.
*   **Purpose:** Maintains the RAG (Retrieval-Augmented Generation) context that was used to answer each question, enabling review and improvement of the retrieval process.
*   **Key Features:**
    - One-to-many relationship with `llmTranscriptionQuestions` (each question can have multiple relevant context snippets)
    - Stores the actual text snippets that were retrieved and provided to the LLM
    - Tracks reviewer validation of context relevance
    - Enables analysis of RAG pipeline effectiveness
*   **RAG Process:** During question processing, the system retrieves relevant context snippets from the vector database and stores them here. Reviewers can then validate whether the retrieved context was actually relevant to answering the question.
*   **Columns:**
    | Column Name                | Data Type | Constraints/PK/FK                        | Description                                                                   |
    |----------------------------|-----------|------------------------------------------|-------------------------------------------------------------------------------|
    | `id`                       | string    | PK                                       | Unique identifier for a context entry.                                        |
    | `llmTranscriptionQuestionId` | string    | FK -> `llmTranscriptionQuestions.id`     | Identifier of the LLM question instance this context is for.                |
    | `context`                  | string    |                                          | The actual text snippet from the transcription that was provided to the LLM as context. |
    | `isValidInd`               | number    |                                          | Reviewer validation: 1=context snippet was relevant and helpful, 0=context was not relevant or misleading. |
    | `updatedAt`                | date      |                                          | Timestamp of the last update.                                                 |
    | `createdAt`                | date      |                                          | Timestamp of creation.                                                        |
    | `deletedAt`                | date      | nullable                                 | Timestamp if this context entry is soft-deleted.                              |

### 12. `questions`
*   **Description:** Defines the standard set of questions that can be asked.
*   **Columns:**
    | Column Name   | Data Type | Constraints/PK/FK | Description                                       |
    |---------------|-----------|-------------------|---------------------------------------------------|
    | `id`          | string    | PK                | Unique identifier for the question definition.    |
    | `name`        | string    |                   | Internal name or key for the question.            |
    | `label`       | string    |                   | User-facing label or display text for the question. |
    | `reference`   | string    | Unique            | A short, unique reference code for the question.  |
    | `questionType`| string    | nullable          | Category or type of the question.                 |
    | `updatedAt`   | date      |                   | Timestamp of the last update.                     |
    | `createdAt`   | date      |                   | Timestamp of creation.                            |

### 13. `communityAssessmentFields`
*   **Description:** Defines fields that might be part of a broader community assessment.
*   **Columns:**
    | Column Name             | Data Type   | Constraints/PK/FK | Description                                                      |
    |-------------------------|-------------|-------------------|------------------------------------------------------------------|
    | `id`                    | string      | PK                | Unique identifier for the assessment field.                      |
    | `name`                  | string      |                   | Name of the assessment field.                                    |
    | `key`                   | string      | Unique            | A unique key for the field.                                      |
    | `options`               | string/JSON | nullable          | Predefined options for the field, if any.                        |
    | `category`              | string      | nullable          | Category of the assessment field.                                |
    | `communityAssessmentId` | string      | nullable          | Identifier of a parent community assessment, if applicable.      |
    | `updatedAt`             | date        |                   | Timestamp of the last update.                                    |
    | `createdAt`             | date        |                   | Timestamp of creation.                                           |

---

## Data Validation and Quality Assurance

### Valid Response Criteria

A response is considered **valid** in the database when all of the following conditions are met:

1. **Accurate Response**: `llmTranscriptionQuestionResponses.isValidInd = 1`
2. **Source Tracking**: `llmTranscriptionQuestionResponses.isFromLLmInd` indicates whether the response came from the LLM (1) or was manually corrected (0)
3. **Valid Context**: At least one associated context snippet has `llmTranscriptionQuestionContext.isValidInd = 1`

### Review Team Workflow

The review team performs quality assurance on LLM responses through the following process:

1. **Response Validation**: Reviewers examine each LLM response and mark it as correct (`isValidInd = 1`) or incorrect (`isValidInd = 0`)
2. **Context Validation**: Reviewers validate whether the retrieved context snippets were relevant to answering the question
3. **Correction Process**: When LLM responses are incorrect, reviewers provide corrected responses with `isFromLLmInd = 0`
4. **Quality Metrics**: The system tracks success rates and identifies patterns in LLM performance

---

## Relationships

*   **`recordings` to `media`:**
    *   `recordings.mediaId` (One) -> `media.id` (One) *(Implied one-to-one link for primary media)*
*   **`recordings` to `users`:**
    *   `recordings.userId` (Many) -> `users.id` (One)
*   **`recordings` to `transcriptions`:**
    *   `recordings.id` (One) -> `transcriptions.recordingId` (One)
*   **`transcriptions` to `llmTranscriptions`:**
    *   `transcriptions.id` (One) -> `llmTranscriptions.transcriptionId` (One)
*   **`userProfiles` to `users`:**
    *   `userProfiles.userId` (One) -> `users.id` (One)
*   **`userRoles` to `users`:**
    *   `userRoles.userId` (Many) -> `users.id` (One)
*   **`llmTranscriptions` to `llmTranscriptionQuestions`:**
    *   `llmTranscriptions.id` (One) -> `llmTranscriptionQuestions.llmTranscriptionId` (Many)
*   **`questions` to `llmQuestionParameters` (Polymorphic):**
    *   `questions.id` (One) -> `llmQuestionParameters.questionableId` (One, where `questionableType` = 'Question')
*   **`communityAssessmentFields` to `llmQuestionParameters` (Polymorphic):**
    *   `communityAssessmentFields.id` (One) -> `llmQuestionParameters.questionableId` (One, where `questionableType` = 'CommunityAssessmentField')
*   **`llmTranscriptionQuestions` to `llmTranscriptionQuestionResponses`:**
    *   `llmTranscriptionQuestions.id` (One) -> `llmTranscriptionQuestionResponses.llmTranscriptionQuestionId` (One)
*   **`llmTranscriptionQuestions` to `llmTranscriptionQuestionContext`:**
    *   `llmTranscriptionQuestions.id` (One) -> `llmTranscriptionQuestionContext.llmTranscriptionQuestionId` (Many)
*   **`llmTranscriptionQuestions` to `communityAssessmentFields` (Polymorphic):**
    *   `llmTranscriptionQuestions.questionableId` (Many) -> `communityAssessmentFields.id` (One, where `questionableType` = 'CommunityAssessmentField')
*   **`llmTranscriptionQuestions` to `questions` (Polymorphic):**
    *   `llmTranscriptionQuestions.questionableId` (Many) -> `questions.id` (One, where `questionableType` = 'Question')

**Relationship Key:**
*   `(One) -> (One)`: One-to-One
*   `(Many) -> (One)`: Many-to-One
*   `(One) -> (Many)`: One-to-Many
