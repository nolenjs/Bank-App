export function displayClassNameWithPurpose(purpose: string){
    return (target: Function) => {
        console.log(`Class Name: ${target.name} /nPurpose: ${purpose}`);
    }
}