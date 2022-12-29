import Body from "../components/Body";
import IconButton from "../components/UIElements/IconButton";
import LabledInput from "../components/UIElements/LabledInput";
import {MdModeEdit as EditIcon} from 'react-icons/md'

export default function Setting(){
    return (
        <Body title="Setting">
          <div className="w-full  max-w-xl p-8 rounded-lg shadow-sm bg-white">
            <div className="w-full max-w-sm flex flex-col gap-4">
              <LabledInput
                fullWidth
                label={"Tax Rate"}
                inputProps={{
                  placeholder:"Enter Tax Rate (%)",
                  name:"taxRate",
                  type:"number",
                }}
              />
              <LabledInput
                fullWidth
                label={"Website Domain"}
                inputProps={{
                  placeholder:"Enter your Website url",
                  name:"webDomain",
                  type:"url",
                }}
              />
              <IconButton
                size="lg"
                color="success"
                className="w-full m-0 mt-8"
                iconStart={<EditIcon/>}
              >Edit Setting</IconButton>
            </div>
          </div>
        </Body>
    );
}