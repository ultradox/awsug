/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSpeakerEoi = /* GraphQL */ `
  mutation CreateSpeakerEoi(
    $input: CreateSpeakerEoiInput!
    $condition: ModelSpeakerEoiConditionInput
  ) {
    createSpeakerEoi(input: $input, condition: $condition) {
      id
      name
      surname
      email
      mobile
      description
      estimatedLength
      dateOption1
      dateOption2
      status
      archived
      sortHash
      createdAt
      updatedAt
    }
  }
`;
export const updateSpeakerEoi = /* GraphQL */ `
  mutation UpdateSpeakerEoi(
    $input: UpdateSpeakerEoiInput!
    $condition: ModelSpeakerEoiConditionInput
  ) {
    updateSpeakerEoi(input: $input, condition: $condition) {
      id
      name
      surname
      email
      mobile
      description
      estimatedLength
      dateOption1
      dateOption2
      status
      archived
      sortHash
      createdAt
      updatedAt
    }
  }
`;
export const deleteSpeakerEoi = /* GraphQL */ `
  mutation DeleteSpeakerEoi(
    $input: DeleteSpeakerEoiInput!
    $condition: ModelSpeakerEoiConditionInput
  ) {
    deleteSpeakerEoi(input: $input, condition: $condition) {
      id
      name
      surname
      email
      mobile
      description
      estimatedLength
      dateOption1
      dateOption2
      status
      archived
      sortHash
      createdAt
      updatedAt
    }
  }
`;
export const createDraft = /* GraphQL */ `
  mutation CreateDraft(
    $input: CreateDraftInput!
    $condition: ModelDraftConditionInput
  ) {
    createDraft(input: $input, condition: $condition) {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      reqRv
      reviewed
      rvDate
      pubDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateDraft = /* GraphQL */ `
  mutation UpdateDraft(
    $input: UpdateDraftInput!
    $condition: ModelDraftConditionInput
  ) {
    updateDraft(input: $input, condition: $condition) {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      reqRv
      reviewed
      rvDate
      pubDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteDraft = /* GraphQL */ `
  mutation DeleteDraft(
    $input: DeleteDraftInput!
    $condition: ModelDraftConditionInput
  ) {
    deleteDraft(input: $input, condition: $condition) {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      reqRv
      reviewed
      rvDate
      pubDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      pubDate
      lastModified
      createdAt
      updatedAt
      comments {
        items {
          id
          postAnchor
          content
          userId
          userName
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      pubDate
      lastModified
      createdAt
      updatedAt
      comments {
        items {
          id
          postAnchor
          content
          userId
          userName
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      pubDate
      lastModified
      createdAt
      updatedAt
      comments {
        items {
          id
          postAnchor
          content
          userId
          userName
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      postAnchor
      content
      userId
      userName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      postAnchor
      content
      userId
      userName
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      postAnchor
      content
      userId
      userName
      createdAt
      updatedAt
      owner
    }
  }
`;
