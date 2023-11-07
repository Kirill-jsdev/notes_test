import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'


const Dashboard = () => {

    const notebooks = useSelector(state => state.notebooks.notebooks)

    const [stat, setStat] = useState()

    useEffect(() => {

        const allNotes = [];
        const lengths = []
        let totalWords = 0
      
        for (const item of notebooks) {
          for (const n of item.notes) {
            allNotes.push(n);
            lengths.push(n.content.length)
            totalWords += n.content.split(' ').length
          }
        }

        const avgLength = lengths.reduce((acc, curr) => acc + curr, 0) / lengths.length || 0

        setStat({allNotes, avgLength, totalWords})

    }, [])

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Notebook Statistics</div>
            <p className="text-gray-600">
                Number of Notebooks: {notebooks.length}
            </p>
            <p className="text-gray-600">
                Number of Notes: {stat ? stat.allNotes.length : 0}
            </p>
            <p className="text-gray-600">
                Average Note Length: {stat ? stat.avgLength.toFixed(1) : 0} characters
            </p>
            <p className="text-gray-600">
                Total Words in All Notes: {stat ? stat.totalWords : 0}
            </p>
            </div>
        </div>
    )
}

export default Dashboard