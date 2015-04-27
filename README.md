# Note on setup running Mac OS X

You will need to update the open file limits in your terminal window, otherwise node has issues:

    Change global file limit:
    $ sudo launchctl limit maxfiles 1000000 1000000

    Change file limit in terminal session:
    $ ulimit -n 100000

Note: You have to do this each time these settings have been lost, for example if your computer
has been in hibernation or similar. If you get random errors when doing npm install/update/start
just run these two commands and it usually fixes things. 

## Developer Notes ###

### TODO ###

TODO: Favicon
    "serve-favicon": "~2.1.3",

TODO: When creating an object, allow creation through interface to limit what properties are set something like:
        new ObjectPrototype(IObjectInterface(data));
        
STARTED: proper data fetching from API with object type handling
    TODO: Pass back server errors
    TODO: Add search endpoint
    TODO: Make sure errors are displayed in form
    TODO: Check why form validation stopped working for birth_year
STARTED: REST-API with persistence
    TODO: Should the API be more explicit?
    TODO: Should objects be mounted on workflow? (maybe not, it is strange for frontent)
    TODO: Persist to mongodb
TODO: User and session handling
TODO: More input widgets
TODO: Flux style for data flow in app?

### Issue With Kerberos for Mongodb-driver ###

Seems that nodemon and Gulp are conflicting with the mongodb-driver so trying different watcher.

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

IPersistenceService:
    create
    update
    fetch
    delete


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