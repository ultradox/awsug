/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSpeakerEoi = /* GraphQL */ `
  query GetSpeakerEoi($id: ID!) {
    getSpeakerEoi(id: $id) {
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
export const listSpeakerEois = /* GraphQL */ `
  query ListSpeakerEois(
    $filter: ModelSpeakerEoiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpeakerEois(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDraft = /* GraphQL */ `
  query GetDraft($anchor: String!) {
    getDraft(anchor: $anchor) {
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
export const listDrafts = /* GraphQL */ `
  query ListDrafts(
    $anchor: String
    $filter: ModelDraftFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDrafts(
      anchor: $anchor
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const speakerEoiByCreatedAt = /* GraphQL */ `
  query SpeakerEoiByCreatedAt(
    $sortHash: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSpeakerEoiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    speakerEoiByCreatedAt(
      sortHash: $sortHash
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const draftByCreatedAt = /* GraphQL */ `
  query DraftByCreatedAt(
    $sortHash: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDraftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    draftByCreatedAt(
      sortHash: $sortHash
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($anchor: String!) {
    getPost(anchor: $anchor) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $anchor: String
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPosts(
      anchor: $anchor
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const postByPubDate = /* GraphQL */ `
  query PostByPubDate(
    $sortHash: String
    $pubDate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByPubDate(
      sortHash: $sortHash
      pubDate: $pubDate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const commentByCreatedAt = /* GraphQL */ `
  query CommentByCreatedAt(
    $postAnchor: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentByCreatedAt(
      postAnchor: $postAnchor
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
