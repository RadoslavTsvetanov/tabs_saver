export const Loading: React.FC<{text: string}> = ({text}) => {
    return <div>
        <div>Loading{text} ...</div>
        <div>if its loading more than 1 min restart the extension anf if the issue is still there contact dev</div>
        <div>Uninstalling the extension is safe since your browser sessions are nit saved locally</div>
    </div>
}