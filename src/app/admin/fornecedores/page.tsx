import DataTable from '@/components/suppliers/dataTable/dataTable';
import { Title } from '@/components/suppliers/Title/title.style';

export default async function Page() {

  return (
    <div>
      <Title>
        <h1>Fornecedores</h1>
        <p>Confira nossos fornecedores parceiros e escolha os mais alinhados às suas necessidades</p>
      </Title>


      <div>
        <DataTable />
      </div>
    </div>
  );
}