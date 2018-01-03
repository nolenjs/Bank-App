export function displayClassName(target: Function){
    console.log(`Class Name: ${target.name}`);
}

export function displayClassNameWithPurpose(purpose: string){
    return (target: Function) => {
        console.log(`Class Name: ${target.name} /nPurpose: ${purpose}`);
    }
}