#### App Architecture

There is a simple app with limited features I didn't have to reach for any complex architectures like MVC or MVVM and global state management tool. 

In this case I used a simple VC(view-controller) architecture. The controller manages the state and provides methods to update the state while the view layer are custom components that take in props and then render markup/html.


### App State

I decided against any global state management solution because this is a simple single page application and I dont need to share a lot of state. I could have used useReducer to manage the state of the notes:

```
interface Note {
  id: string;
  text: string
  position: { top: number, left:number }
}

```

which is a slightly complex/nested state but I decided using a useState object would be less verbose solution considering how simple the app is but in a more complex situation a useReducer might be more appropraite because it helps us know what updated the state and keep track of how the state transitions.


We also have a few state in this application.

- `isInDeleteArea` (boolean) : A boolean to know when a note is dragged over the trash area.

- `activeDraggedNoteID` (string) : Id of the currently dragged note