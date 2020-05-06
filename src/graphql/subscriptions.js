/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSpeakerEoi = /* GraphQL */ `
  subscription OnCreateSpeakerEoi($owner: String!) {
    onCreateSpeakerEoi(owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdateSpeakerEoi = /* GraphQL */ `
  subscription OnUpdateSpeakerEoi {
    onUpdateSpeakerEoi {
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
      owner
    }
  }
`;
export const onDeleteSpeakerEoi = /* GraphQL */ `
  subscription OnDeleteSpeakerEoi {
    onDeleteSpeakerEoi {
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
      owner
    }
  }
`;
export const onCreateDraft = /* GraphQL */ `
  subscription OnCreateDraft($owner: String!) {
    onCreateDraft(owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdateDraft = /* GraphQL */ `
  subscription OnUpdateDraft($owner: String) {
    onUpdateDraft(owner: $owner) {
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
      owner
    }
  }
`;
export const onDeleteDraft = /* GraphQL */ `
  subscription OnDeleteDraft($owner: String) {
    onDeleteDraft(owner: $owner) {
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
      owner
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      pubDate
      createdAt
      comments {
        items {
          id
          postAnchor
          content
          userId
          userName
          createdAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      pubDate
      createdAt
      comments {
        items {
          id
          postAnchor
          content
          userId
          userName
          createdAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      userName
      anchor
      author
      socLink
      sortHash
      title
      summary
      content
      pubDate
      createdAt
      comments {
        items {
          id
          postAnchor
          content
          userId
          userName
          createdAt
          owner
        }
        nextToken
      }
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String!) {
    onCreateComment(owner: $owner) {
      id
      postAnchor
      content
      userId
      userName
      createdAt
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String!) {
    onUpdateComment(owner: $owner) {
      id
      postAnchor
      content
      userId
      userName
      createdAt
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
      id
      postAnchor
      content
      userId
      userName
      createdAt
      owner
    }
  }
`;
