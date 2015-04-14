## Developer Notes ###

### TODO ###

TODO: proper data fetching from API with object type handling (can I use flux here, check it out)
TODO: REST-API with persistence
TODO: User and session handling
TODO: More input widgets

### Interfaces ###

IObject > ObjectPrototype
    title: rw String
    createdAt: ro DateTime
    modifiedAt: ro DateTime
    objectType: ro String
    
IUser > User (Inherits from IObject)

IWorkflowContainer
    getContent(params)
    
IWorkflowState: adapter (get and manipulate workflow state on IObject)
    context._workflowState
    getState
    setState
    getTransitions
    

IObjectPersist: adapter (store object in backend)
    persist

IAnonymousSession: utility, not logged in
    login(username, password)
    forgotPassword(username)
    
IUserSession: utility, the current session
    currentUser
    logout

IMainStage: adapter (render view for current session)

IListView
    ReactComponent
    
IListItemView: adapter (render object in list)
    ReactComponent
IListItemEdit: adapter (render object edit view in list)
    ReactComponent

IViewObject: adapter (render object view)
    ReactComponent
IEditObject: adapter (render object edit view)
    ReactComponent

IContentMenu: marker interface
IContentMenuItem: utility
    order
    ReactComponent

IUserWidget: adapts IUserSession
    ReactComponent


### Components ###

component-registry
    - interface
    - object prototype
    - adapter
    - utility
component-schema
    - fields
    - validation
component-schema-react-forms
    - react-widgets
    - form generator
component-rest
    - REST API with persitence