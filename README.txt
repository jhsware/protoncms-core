IObject > ObjectPrototype
    title: rw String
    createdAt: ro DateTime
    modifiedAt: ro DateTime
    objectType: ro String
    
IUser > UserPrototype (Inherits from IObject)

IWorkflow
    getList
    
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

IObjectView: adapter (render object view)
    ReactComponent
IObjectEdit: adapter (render object edit view)
    ReactComponent

IContentMenu: marker interface
IContentMenuItem: utility
    order
    ReactComponent

IUserWidget: adapts IUserSession
    ReactComponent
