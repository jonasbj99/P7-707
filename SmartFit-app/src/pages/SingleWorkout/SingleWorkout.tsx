import React from 'react';
import Header from '../../components/Header/Header';
import '../../pages/SingleWorkout/SingleWorkout.scss';
import LogOverview from '../../components/LogOverview/LogOverview';


const SingleWorkout= () => {
return (
    <div className="single-page">  
      <div className="overview-section">
        <Header
          variant={'phoneS'}
          title='WORKOUT 6'
        />
        
         <div className="single_log_overview">
        <LogOverview exercise={'Squat'} set={1} reps={10} weight={'60kg'} onEdit={function (): void {
                    throw new Error('Function not implemented.');
                } }/>
        <LogOverview exercise={'Squat'} set={2} reps={10} weight={'65kg'} onEdit={function (): void {
                    throw new Error('Function not implemented.');
                } }/>
        <LogOverview exercise={'Squat'} set={3} reps={8} weight={'70kg'} onEdit={function (): void {
                    throw new Error('Function not implemented.');
                } }/>
        <LogOverview exercise={'Squat'} set={4} reps={8} weight={'70kg'} onEdit={function (): void {
                    throw new Error('Function not implemented.');
                } }/>
        <LogOverview exercise={'Squat'} set={5} reps={6} weight={'75kg'} onEdit={function (): void {
                    throw new Error('Function not implemented.');
                } }/>
      </div>
    </div>
    </div>
  );
};

export default SingleWorkout;