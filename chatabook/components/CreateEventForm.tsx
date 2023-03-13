import gql from "graphql-tag";
import { useState } from "react";


const AllNamesQuery = gql`
  query {
    events {
      user {
        name
        surname
      }
    }
  }
`;





export default function CreateEventForm(){
    const [formState, setFormState] = useState({
        name: '',
        url: '',

      });
    
      return (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-column mt3">
              <input
                className="mb2"
                value={formState.name}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: e.target.value
                  })
                }
                type="text"
                placeholder="A description for the link"
              />
              <input
                className="mb2"
                value={formState.url}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    url: e.target.value
                  })
                }
                type="text"
                placeholder="The URL for the link"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
